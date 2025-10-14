# Frontend Hexagonal Architecture

## 📐 Estructura de Capas

El frontend está construido siguiendo **Hexagonal Architecture** (Ports & Adapters) combinado con **Clean Architecture** y **SOLID principles**.

```
frontend/src/
├── domain/                    # 🔵 DOMAIN LAYER (Core Business Logic)
│   ├── entities/
│   │   ├── screen.entity.ts           # Entidad Screen con lógica de negocio
│   │   └── component.entity.ts        # Entidad Component
│   ├── value-objects/
│   │   ├── screen-metadata.vo.ts      # Metadatos inmutables
│   │   └── component-props.vo.ts      # Props tipadas
│   ├── enums/
│   │   └── component-type.enum.ts     # Tipos de componentes
│   ├── ports/
│   │   └── screen.repository.interface.ts  # Output Port
│   └── services/
│       └── screen-validator.service.ts     # Domain Service
│
├── application/               # 🟢 APPLICATION LAYER (Use Cases)
│   ├── use-cases/
│   │   ├── get-screen-by-id.use-case.ts
│   │   ├── get-home-screen.use-case.ts
│   │   └── get-all-screens.use-case.ts
│   ├── services/
│   │   └── screen-application.service.ts   # Orchestrator
│   ├── ports/
│   │   └── screen-service.interface.ts     # Input Port
│   ├── dtos/
│   │   └── screen.dto.ts                   # Data Transfer Objects
│   └── mappers/
│       └── screen.mapper.ts                # Entity ↔ DTO
│
├── infrastructure/            # 🔴 INFRASTRUCTURE LAYER (Adapters)
│   ├── adapters/
│   │   └── repositories/
│   │       └── http-screen.repository.ts   # HTTP Implementation
│   └── di/
│       └── container.ts                    # Dependency Injection
│
└── presentation/              # 🟡 PRESENTATION LAYER (React UI)
    ├── hooks/
    │   └── useScreen.ts                    # React Hooks
    └── components/
        ├── ScreenView.tsx                  # Screen Container
        ├── ComponentRenderer.tsx           # Dynamic Renderer
        ├── Loading.tsx                     # Loading State
        └── ErrorView.tsx                   # Error State
```

---

## 🎯 SOLID Principles Implementation

### 1. **Single Responsibility Principle (SRP)**

Cada clase/módulo tiene una única responsabilidad:

```typescript
// ✅ CORRECTO: Cada clase tiene una responsabilidad
class ScreenEntity { /* Solo lógica de pantalla */ }
class ScreenValidatorService { /* Solo validación */ }
class GetScreenByIdUseCase { /* Solo obtener por ID */ }
class HttpScreenRepository { /* Solo comunicación HTTP */ }
```

### 2. **Open/Closed Principle (OCP)**

Abierto para extensión, cerrado para modificación:

```typescript
// ✅ Extensible agregando nuevos componentes sin modificar código existente
export enum ComponentType {
  BUTTON = 'button',
  INPUT = 'input',
  ALERT = 'alert',
  CONTAINER = 'container',
  // Fácil agregar: MODAL = 'modal'
}

// ✅ ComponentRenderer extensible sin modificar clase base
const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  switch (component.type) {
    case 'button': return <Button {...component.props} />;
    // Agregar nuevo case para MODAL
  }
};
```

### 3. **Liskov Substitution Principle (LSP)**

Las implementaciones pueden reemplazar sus abstracciones:

```typescript
// ✅ HttpScreenRepository puede reemplazar IScreenRepository
interface IScreenRepository {
  getScreenById(id: string): Promise<ScreenEntity>;
}

class HttpScreenRepository implements IScreenRepository {
  // Implementación HTTP
}

class MockScreenRepository implements IScreenRepository {
  // Implementación Mock para testing
}
```

### 4. **Interface Segregation Principle (ISP)**

Interfaces específicas en lugar de generales:

```typescript
// ✅ Interfaces segregadas
interface IScreenRepository {
  getScreenById(screenId: string): Promise<ScreenEntity>;
  getHomeScreen(): Promise<ScreenEntity>;
  getAllScreens(): Promise<ScreenEntity[]>;
}

interface IScreenService {
  getScreenById(screenId: string): Promise<ScreenDTO>;
  getHomeScreen(): Promise<ScreenDTO>;
  getDashboardScreen(): Promise<ScreenDTO>;
  getAllScreens(): Promise<ScreenDTO[]>;
}
```

### 5. **Dependency Inversion Principle (DIP)**

Depende de abstracciones, no de implementaciones:

```typescript
// ✅ Use Case depende de interfaz, no de implementación
class GetScreenByIdUseCase {
  constructor(
    private readonly screenRepository: IScreenRepository  // ← Abstracción
  ) {}
}

// ✅ Service depende de interfaz
class ScreenApplicationService implements IScreenService {
  constructor(screenRepository: IScreenRepository) {
    // Inyección de dependencia
  }
}
```

---

## 🔄 Flujo de Datos (Dependency Rule)

Las dependencias **siempre apuntan hacia dentro**:

```
Presentation → Application → Domain
     ↓              ↓            ↑
Infrastructure ─────────────────┘
```

### Ejemplo de Flujo Completo:

1. **Presentation Layer (UI)**
```typescript
// Hook llama al servicio
const { screen, loading, error } = useHomeScreen();
```

2. **Application Layer (Use Cases)**
```typescript
class GetHomeScreenUseCase {
  async execute(): Promise<ScreenDTO> {
    const entity = await this.repository.getHomeScreen(); // ← Port
    return ScreenMapper.toDTO(entity);
  }
}
```

3. **Domain Layer (Business Logic)**
```typescript
class ScreenEntity {
  validate(): void {
    // Lógica de negocio pura
  }
}
```

4. **Infrastructure Layer (Adapters)**
```typescript
class HttpScreenRepository implements IScreenRepository {
  async getHomeScreen(): Promise<ScreenEntity> {
    const dto = await fetch('/sdui/screen/home');
    return ScreenMapper.toEntity(dto); // ← Convierte a Domain
  }
}
```

---

## 🔌 Ports & Adapters

### **Output Ports** (Domain → Infrastructure)

```typescript
// domain/ports/screen.repository.interface.ts
export interface IScreenRepository {
  getScreenById(screenId: string): Promise<ScreenEntity>;
}

// infrastructure/adapters/repositories/http-screen.repository.ts
export class HttpScreenRepository implements IScreenRepository {
  // Implementación concreta
}
```

### **Input Ports** (Presentation → Application)

```typescript
// application/ports/screen-service.interface.ts
export interface IScreenService {
  getScreenById(screenId: string): Promise<ScreenDTO>;
}

// application/services/screen-application.service.ts
export class ScreenApplicationService implements IScreenService {
  // Implementación del servicio
}
```

---

## 🧪 Dependency Injection

Configuración centralizada de dependencias:

```typescript
// infrastructure/di/container.ts
class DIContainer {
  getScreenRepository(): IScreenRepository {
    return new HttpScreenRepository();
  }

  getScreenService(): IScreenService {
    const repository = this.getScreenRepository();
    return new ScreenApplicationService(repository);
  }
}

// Uso en Presentation Layer
import { getScreenService } from '../../infrastructure/di/container';

export function useScreen(screenId: string) {
  const screenService = getScreenService(); // ← DI
  // ...
}
```

---

## 🎨 Presentation Layer Patterns

### **Custom Hooks** (React)

Encapsulan lógica de estado y efectos:

```typescript
export function useScreen(screenId: string): UseScreenResult {
  const [screen, setScreen] = useState<ScreenDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const screenService = getScreenService();

  useEffect(() => {
    screenService.getScreenById(screenId)
      .then(setScreen)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [screenId]);

  return { screen, loading, error };
}
```

### **Component Composition**

```typescript
function App() {
  const { screen, loading, error, refetch } = useHomeScreen();

  if (loading) return <Loading />;
  if (error) return <ErrorView error={error} onRetry={refetch} />;
  if (!screen) return <ErrorView error="No data" />;

  return <ScreenView screen={screen} />;
}
```

---

## 📊 Benefits of This Architecture

| Benefit | Description |
|---------|-------------|
| **Testability** | Cada capa se puede testear independientemente con mocks |
| **Maintainability** | Cambios en UI no afectan lógica de negocio |
| **Scalability** | Fácil agregar nuevos use cases y componentes |
| **Flexibility** | Cambiar de HTTP a WebSocket sin tocar lógica |
| **Reusability** | Use cases reutilizables en diferentes UIs |
| **Team Collaboration** | Equipos pueden trabajar en capas independientes |

---

## 🚀 Usage Examples

### Ejemplo 1: Obtener Pantalla Home

```typescript
import { useHomeScreen } from './presentation/hooks/useScreen';
import { ScreenView } from './presentation/components/ScreenView';

function HomePage() {
  const { screen, loading, error } = useHomeScreen();
  
  if (loading) return <Loading />;
  if (error) return <ErrorView error={error} />;
  
  return <ScreenView screen={screen!} />;
}
```

### Ejemplo 2: Obtener Pantalla por ID

```typescript
function DynamicPage({ screenId }: { screenId: string }) {
  const { screen, loading, error, refetch } = useScreen(screenId);
  
  return (
    <>
      {loading && <Loading />}
      {error && <ErrorView error={error} onRetry={refetch} />}
      {screen && <ScreenView screen={screen} />}
    </>
  );
}
```

### Ejemplo 3: Todas las Pantallas

```typescript
import { useAllScreens } from './presentation/hooks/useScreen';

function ScreenList() {
  const { screens, loading, error } = useAllScreens();
  
  return (
    <ul>
      {screens.map(screen => (
        <li key={screen.id}>{screen.title}</li>
      ))}
    </ul>
  );
}
```

---

## 🔧 Extending the Architecture

### Adding a New Use Case

1. **Create Use Case** (Application Layer)
```typescript
// application/use-cases/search-screens.use-case.ts
export class SearchScreensUseCase {
  constructor(private repository: IScreenRepository) {}
  
  async execute(query: string): Promise<ScreenDTO[]> {
    const entities = await this.repository.searchScreens(query);
    return ScreenMapper.toDTOList(entities);
  }
}
```

2. **Add to Service** (Application Layer)
```typescript
export class ScreenApplicationService implements IScreenService {
  searchScreens(query: string): Promise<ScreenDTO[]> {
    return this.searchScreensUseCase.execute(query);
  }
}
```

3. **Create Hook** (Presentation Layer)
```typescript
export function useSearchScreens(query: string) {
  // Implementation
}
```

---

## 📝 Testing Strategy

### Unit Tests (Domain Layer)
```typescript
describe('ScreenEntity', () => {
  it('should validate screen correctly', () => {
    const screen = new ScreenEntity(id, metadata, components);
    expect(screen.hasComponents()).toBe(true);
  });
});
```

### Integration Tests (Application Layer)
```typescript
describe('GetScreenByIdUseCase', () => {
  it('should get screen from repository', async () => {
    const mockRepo = new MockScreenRepository();
    const useCase = new GetScreenByIdUseCase(mockRepo);
    const result = await useCase.execute('home');
    expect(result).toBeDefined();
  });
});
```

### E2E Tests (Presentation Layer)
```typescript
describe('App', () => {
  it('should render home screen', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
  });
});
```

---

## 🎓 Key Takeaways

1. **Domain Layer** es independiente del framework (pure TypeScript)
2. **Application Layer** orquesta use cases sin saber de React o HTTP
3. **Infrastructure Layer** implementa adaptadores concretos (HTTP, Mock, etc.)
4. **Presentation Layer** usa React pero depende de abstracciones

Esta arquitectura hace que el código sea:
- ✅ Fácil de testear
- ✅ Fácil de mantener
- ✅ Fácil de extender
- ✅ Independiente del framework
- ✅ Siguiendo SOLID principles

---

**Next Steps:**
- Add more use cases (create, update, delete screens)
- Implement caching in infrastructure layer
- Add state management (Redux/Zustand) in presentation layer
- Create more sophisticated domain services
