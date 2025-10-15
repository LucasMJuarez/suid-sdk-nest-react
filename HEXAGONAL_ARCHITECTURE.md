# 🏗️ Arquitectura Hexagonal - Backend

## 📐 Principios Aplicados

### SOLID Principles

#### 1. **SRP (Single Responsibility Principle)**
- Cada clase tiene una única responsabilidad
- `ScreenEntity`: Solo lógica de entidad pantalla
- `ScreenBuilderService`: Solo construcción de pantallas
- `ScreenApplicationService`: Solo coordinación de casos de uso
- `SDUIController`: Solo manejo de HTTP

#### 2. **OCP (Open/Closed Principle)**
- Las clases están abiertas para extensión pero cerradas para modificación
- Nuevos tipos de componentes se agregan sin modificar código existente
- Nuevos use cases se agregan sin modificar servicios existentes

#### 3. **LSP (Liskov Substitution Principle)**
- Las implementaciones de interfaces pueden sustituirse entre sí
- `InMemoryScreenRepository` puede ser reemplazado por `PostgresScreenRepository` sin cambiar el código que lo usa

#### 4. **ISP (Interface Segregation Principle)**
- Interfaces específicas y pequeñas
- `IScreenRepository`: Solo métodos necesarios para repositorio
- `IScreenService`: Solo métodos necesarios para servicio

#### 5. **DIP (Dependency Inversion Principle)**
- Dependencias de abstracciones, no implementaciones concretas
- Use cases dependen de `IScreenRepository` (interface), no de implementación
- Controller depende de `IScreenService` (interface), no de implementación

## 📁 Estructura de Capas

```
backend/src/
├── domain/                          # Capa de Dominio (Núcleo)
│   ├── entities/                    # Entidades del dominio
│   │   ├── screen.entity.ts
│   │   └── component.entity.ts
│   ├── value-objects/               # Value Objects inmutables
│   │   ├── screen-id.vo.ts
│   │   ├── screen-metadata.vo.ts
│   │   └── component-props.vo.ts
│   ├── enums/                       # Enumeraciones del dominio
│   │   └── component-type.enum.ts
│   ├── ports/                       # Interfaces (Puertos de salida)
│   │   └── screen.repository.interface.ts
│   └── services/                    # Servicios de dominio
│       └── screen-builder.service.ts
│
├── application/                     # Capa de Aplicación (Casos de Uso)
│   ├── use-cases/                   # Casos de uso específicos
│   │   └── get-screen-by-id.use-case.ts
│   ├── services/                    # Servicios de aplicación
│   │   └── screen-application.service.ts
│   ├── dtos/                        # Data Transfer Objects
│   │   └── screen.dto.ts
│   ├── mappers/                     # Transformadores Entity <-> DTO
│   │   └── screen.mapper.ts
│   └── ports/                       # Interfaces (Puertos de entrada)
│       └── screen-service.interface.ts
│
├── infrastructure/                  # Capa de Infraestructura (Adaptadores)
│   ├── adapters/                    # Adaptadores
│   │   ├── http/                    # Adaptador HTTP (entrada)
│   │   │   └── sdui.controller.ts
│   │   └── repositories/            # Adaptador de persistencia (salida)
│   │       └── in-memory-screen.repository.ts
│   └── sdui.module.ts               # Configuración de módulo
│
├── app.module.ts                    # Módulo principal
└── main.ts                          # Punto de entrada
```

## 🔄 Flujo de Datos (Hexagonal)

```
HTTP Request (Puerto de Entrada)
        ↓
┌─────────────────────────────────────────────────────┐
│  INFRASTRUCTURE LAYER (Adaptadores)                 │
│  ┌───────────────────────────────────────────────┐  │
│  │ SDUIController (HTTP Adapter)                 │  │
│  │ - Recibe HTTP Request                         │  │
│  │ - Valida entrada                              │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │ Llama a
                      ▼
┌─────────────────────────────────────────────────────┐
│  APPLICATION LAYER (Casos de Uso)                   │
│  ┌───────────────────────────────────────────────┐  │
│  │ ScreenApplicationService                      │  │
│  │ - Orquesta lógica de aplicación              │  │
│  │ - Coordina use cases                          │  │
│  └───────────────────────────────────────────────┘  │
│                      │                               │
│                      │ Usa                           │
│                      ▼                               │
│  ┌───────────────────────────────────────────────┐  │
│  │ ScreenMapper                                  │  │
│  │ - Transforma Entity <-> DTO                   │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │ Usa lógica de negocio
                      ▼
┌─────────────────────────────────────────────────────┐
│  DOMAIN LAYER (Núcleo de Negocio)                   │
│  ┌───────────────────────────────────────────────┐  │
│  │ ScreenBuilderService (Domain Service)        │  │
│  │ - Lógica de construcción de pantallas        │  │
│  └───────────────────────────────────────────────┘  │
│                      │                               │
│                      │ Crea                          │
│                      ▼                               │
│  ┌───────────────────────────────────────────────┐  │
│  │ ScreenEntity (Aggregate Root)                 │  │
│  │ - ScreenId (Value Object)                     │  │
│  │ - ScreenMetadata (Value Object)               │  │
│  │ - ComponentEntity[]                           │  │
│  │   - ComponentType (Enum)                      │  │
│  │   - ComponentProps (Value Object)             │  │
│  └───────────────────────────────────────────────┘  │
│                      │                               │
│                      │ Podría usar (si necesario)    │
│                      ▼                               │
│  ┌───────────────────────────────────────────────┐  │
│  │ IScreenRepository (Puerto)                    │  │
│  │ - Interface de persistencia                   │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │ Implementado por
                      ▼
┌─────────────────────────────────────────────────────┐
│  INFRASTRUCTURE LAYER (Adaptadores)                 │
│  ┌───────────────────────────────────────────────┐  │
│  │ InMemoryScreenRepository (Persistence Adapter)│  │
│  │ - Implementa IScreenRepository                │  │
│  │ - Almacenamiento en memoria                   │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## 🎯 Puertos y Adaptadores

### Puertos de Entrada (Input Ports)
- **IScreenService**: Define los casos de uso disponibles
- Implementado por: `ScreenApplicationService`
- Usado por: `SDUIController`

### Puertos de Salida (Output Ports)
- **IScreenRepository**: Define cómo acceder a datos
- Implementado por: `InMemoryScreenRepository`
- Usado por: Use cases y servicios de aplicación

## 🔌 Dependency Injection

```typescript
@Module({
  providers: [
    {
      provide: 'IScreenService',
      useClass: ScreenApplicationService,  // Inyección de implementación
    },
    {
      provide: 'IScreenRepository',
      useClass: InMemoryScreenRepository,  // Inyección de implementación
    },
  ],
})
export class SDUIModule {}
```

## 📦 Entidades y Value Objects

### Entidades (con identidad)
- **ScreenEntity**: Tiene ScreenId único
- **ComponentEntity**: Tiene id único

### Value Objects (sin identidad, inmutables)
- **ScreenId**: Identificador de pantalla
- **ScreenMetadata**: Metadatos (título, descripción)
- **ComponentProps**: Propiedades de componente

## 🛡️ Reglas de Dependencia

```
┌─────────────────────┐
│   Infrastructure    │ ─┐
└─────────────────────┘  │
                         │
┌─────────────────────┐  │ Depende de
│   Application       │ ─┤
└─────────────────────┘  │
                         │
┌─────────────────────┐  │
│   Domain (Core)     │ ◄┘
└─────────────────────┘

❌ El dominio NO puede depender de nada
✅ Application puede depender de Domain
✅ Infrastructure puede depender de Application y Domain
```

## 🔄 Ventajas de Esta Arquitectura

1. **Testabilidad**: Fácil crear mocks de interfaces
2. **Mantenibilidad**: Cambios aislados por capas
3. **Escalabilidad**: Fácil agregar nuevos adaptadores
4. **Flexibilidad**: Cambiar implementaciones sin afectar dominio
5. **Independencia del Framework**: Dominio no conoce NestJS

## 📝 Ejemplo de Extensión

### Agregar PostgreSQL Repository

```typescript
// 1. Crear nuevo adapter (Infrastructure)
export class PostgresScreenRepository implements IScreenRepository {
  async findById(id: ScreenId): Promise<ScreenEntity | null> {
    // Implementación con PostgreSQL
  }
  // ... otros métodos
}

// 2. Configurar en módulo
@Module({
  providers: [
    {
      provide: 'IScreenRepository',
      useClass: PostgresScreenRepository,  // ✅ Cambio solo aquí
    },
  ],
})
```

**✅ Sin cambiar**: Domain, Application, Controllers

## 🧪 Testing

```typescript
// Test unitario del dominio (sin dependencias)
describe('ScreenEntity', () => {
  it('should create valid screen', () => {
    const screen = ScreenEntity.create(
      ScreenId.create('test'),
      'Test Screen',
      [component],
    );
    expect(screen).toBeDefined();
  });
});

// Test de aplicación (con mocks)
describe('ScreenApplicationService', () => {
  it('should get home screen', async () => {
    const service = new ScreenApplicationService();
    const result = await service.getHomeScreen();
    expect(result.screen.id).toBe('home');
  });
});

// Test de integración (con repository real)
describe('SDUIController', () => {
  let controller: SDUIController;
  let service: IScreenService;
  
  beforeEach(() => {
    service = new ScreenApplicationService();
    controller = new SDUIController(service);
  });
  
  it('should return screen', async () => {
    const result = await controller.getHomeScreen();
    expect(result.screen).toBeDefined();
  });
});
```

## 📚 Recursos

- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

**✅ Arquitectura implementada cumple con**:
- ✅ Arquitectura Hexagonal (Ports & Adapters)
- ✅ Clean Architecture (capas y reglas de dependencia)
- ✅ Principios SOLID (todos aplicados)
- ✅ Domain-Driven Design (Entities, Value Objects, Services)
