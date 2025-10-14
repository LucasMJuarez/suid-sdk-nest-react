# 🏗️ Arquitectura Hexagonal - Diagrama Completo

## 📊 Diagrama General del Sistema

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React + Vite)                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                    🟡 PRESENTATION LAYER                           │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │  │
│  │  │  useScreen   │  │  ScreenView  │  │   Loading    │            │  │
│  │  │    Hook      │  │  Component   │  │  ErrorView   │            │  │
│  │  └──────┬───────┘  └──────────────┘  └──────────────┘            │  │
│  │         │                                                          │  │
│  └─────────┼──────────────────────────────────────────────────────────┘  │
│            │                                                              │
│            ↓                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                    🟢 APPLICATION LAYER                            │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │              IScreenService (Input Port)                      │ │  │
│  │  └────────────────────────┬─────────────────────────────────────┘ │  │
│  │                           │                                        │  │
│  │  ┌────────────────────────▼─────────────────────────────────────┐ │  │
│  │  │          ScreenApplicationService                             │ │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │ │  │
│  │  │  │GetScreenById │  │GetHomeScreen │  │GetAllScreens │       │ │  │
│  │  │  │   UseCase    │  │   UseCase    │  │   UseCase    │       │ │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘       │ │  │
│  │  └────────────────────────┬─────────────────────────────────────┘ │  │
│  │                           │                                        │  │
│  │  ┌────────────────────────▼─────────────────────────────────────┐ │  │
│  │  │              ScreenMapper (Entity ↔ DTO)                      │ │  │
│  │  └──────────────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────┬──────────────────────────────────────┘  │
│                                │                                          │
│                                ↓                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                     🔵 DOMAIN LAYER (Core)                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │  │
│  │  │Screen Entity │  │Component     │  │   Value      │            │  │
│  │  │              │  │   Entity     │  │  Objects     │            │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘            │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │         IScreenRepository (Output Port)                       │ │  │
│  │  └────────────────────────┬─────────────────────────────────────┘ │  │
│  └───────────────────────────┼────────────────────────────────────────┘  │
│                              │ ↑                                         │
│                              │ │ Dependency Inversion                    │
│                              ↓ │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                    🔴 INFRASTRUCTURE LAYER                           ││
│  │  ┌──────────────────────────────────────────────────────────────┐  ││
│  │  │           HttpScreenRepository                                │  ││
│  │  │  (Implementa IScreenRepository)                               │  ││
│  │  └────────────────────────┬─────────────────────────────────────┘  ││
│  │                           │                                         ││
│  │  ┌────────────────────────▼─────────────────────────────────────┐  ││
│  │  │              DI Container                                     │  ││
│  │  │  (Inyecta dependencias)                                       │  ││
│  │  └──────────────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────┬───────────────────────────────────────┘
                                   │
                                   │ HTTP/REST API
                                   │
┌──────────────────────────────────▼───────────────────────────────────────┐
│                          BACKEND (NestJS)                                 │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                    🔴 INFRASTRUCTURE LAYER                         │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │              SDUIController (HTTP Adapter)                    │ │  │
│  │  └────────────────────────┬─────────────────────────────────────┘ │  │
│  │                           │                                        │  │
│  │  ┌────────────────────────▼─────────────────────────────────────┐ │  │
│  │  │       InMemoryScreenRepository                                │ │  │
│  │  │    (Implementa IScreenRepository)                             │ │  │
│  │  └──────────────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────┬──────────────────────────────────────┘  │
│                                │ ↑                                        │
│                                │ │ Dependency Inversion                  │
│                                ↓ │                                        │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                    🟢 APPLICATION LAYER                            │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │              IScreenService (Input Port)                      │ │  │
│  │  └────────────────────────┬─────────────────────────────────────┘ │  │
│  │                           │                                        │  │
│  │  ┌────────────────────────▼─────────────────────────────────────┐ │  │
│  │  │          ScreenApplicationService                             │ │  │
│  │  │  ┌──────────────────────────────────────────────────────┐    │ │  │
│  │  │  │      GetScreenByIdUseCase                            │    │ │  │
│  │  │  └──────────────────────────────────────────────────────┘    │ │  │
│  │  └────────────────────────┬─────────────────────────────────────┘ │  │
│  │                           │                                        │  │
│  │  ┌────────────────────────▼─────────────────────────────────────┐ │  │
│  │  │              ScreenMapper (Entity ↔ DTO)                      │ │  │
│  │  └──────────────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────┬──────────────────────────────────────┘  │
│                                │                                          │
│                                ↓                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                     🔵 DOMAIN LAYER (Core)                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │  │
│  │  │Screen Entity │  │Component     │  │   Value      │            │  │
│  │  │              │  │   Entity     │  │  Objects     │            │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘            │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │         IScreenRepository (Output Port)                       │ │  │
│  │  └──────────────────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │         ScreenBuilderService (Domain Service)                 │ │  │
│  │  └──────────────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos Completo

### Request Flow (Frontend → Backend)

```
Usuario interactúa con UI
         ↓
🟡 Presentation Layer (React Component)
         ↓
    useScreen Hook
         ↓
🟢 Application Layer (Use Case)
         ↓
   ScreenService.getScreenById()
         ↓
🔴 Infrastructure (HTTP Repository)
         ↓
   fetch('http://localhost:3000/sdui/screen/home')
         ↓
────────────── HTTP REQUEST ──────────────
         ↓
🔴 Backend Infrastructure (NestJS Controller)
         ↓
   @Get('/screen/:id')
         ↓
🟢 Backend Application (Use Case)
         ↓
   GetScreenByIdUseCase.execute()
         ↓
🔵 Backend Domain (Repository Port)
         ↓
   IScreenRepository.getScreenById()
         ↓
🔴 Backend Infrastructure (Repository Implementation)
         ↓
   InMemoryScreenRepository.getScreenById()
         ↓
────────────── HTTP RESPONSE ──────────────
         ↓
🔴 Frontend Infrastructure (HTTP Repository)
         ↓
   ScreenMapper.toEntity(dto)
         ↓
🔵 Frontend Domain (Screen Entity)
         ↓
🟢 Frontend Application (Mapper)
         ↓
   ScreenMapper.toDTO(entity)
         ↓
🟡 Presentation Layer (React Component)
         ↓
   <ScreenView screen={screen} />
         ↓
Usuario ve la pantalla renderizada
```

---

## 🎯 Dependency Rule (Clean Architecture)

```
               ┌─────────────────┐
               │   🟡 UI Layer   │
               │  (Presentation) │
               └────────┬────────┘
                        │
                        ↓ depende de
               ┌─────────────────┐
               │ 🟢 Application  │
               │   (Use Cases)   │
               └────────┬────────┘
                        │
                        ↓ depende de
               ┌─────────────────┐
               │  🔵 Domain      │
               │  (Entities)     │  ← CORE (No dependencies)
               └────────▲────────┘
                        │
                        │ implementa
               ┌────────┴────────┐
               │ 🔴 Infrastructure│
               │   (Adapters)    │
               └─────────────────┘

Las flechas apuntan HACIA EL CENTRO (Domain)
```

---

## 🔌 Ports & Adapters Pattern

### Input Ports (Driving Adapters)

```
┌───────────────┐         ┌────────────────┐
│  UI (React)   │ ──────> │ IScreenService │ (Input Port)
└───────────────┘         └────────┬───────┘
                                   │
                                   │ implementado por
                                   ↓
                          ┌────────────────────┐
                          │ ScreenApplication  │
                          │     Service        │
                          └────────────────────┘
```

### Output Ports (Driven Adapters)

```
┌─────────────────┐         ┌──────────────────┐
│  Use Case       │ ──────> │ IScreenRepository│ (Output Port)
└─────────────────┘         └────────┬─────────┘
                                     │
                                     │ implementado por
                                     ↓
                    ┌────────────────────────────┐
                    │ InMemoryScreenRepository   │
                    │ HttpScreenRepository       │
                    │ MongoDBScreenRepository    │ (Adapters)
                    └────────────────────────────┘
```

---

## 🧩 SOLID Principles Mapping

### SRP - Single Responsibility Principle

```
✅ ScreenEntity           → Solo lógica de entidad Screen
✅ ComponentEntity        → Solo lógica de entidad Component
✅ GetScreenByIdUseCase   → Solo obtener pantalla por ID
✅ ScreenMapper           → Solo mapeo Entity ↔ DTO
✅ HttpScreenRepository   → Solo comunicación HTTP
```

### OCP - Open/Closed Principle

```
✅ Extensible:
   - Agregar nuevo ComponentType sin modificar código
   - Agregar nuevo Use Case sin modificar service existente
   
✅ Cerrado para modificación:
   - Lógica de negocio en Domain no cambia
   - Interfaces definen contratos estables
```

### LSP - Liskov Substitution Principle

```
✅ InMemoryScreenRepository puede reemplazar IScreenRepository
✅ HttpScreenRepository puede reemplazar IScreenRepository
✅ MockScreenRepository puede reemplazar IScreenRepository

Todas respetan el contrato de la interfaz.
```

### ISP - Interface Segregation Principle

```
✅ IScreenRepository       → Solo métodos de repositorio
✅ IScreenService          → Solo métodos de servicio
✅ No interfaces "gordas" con métodos innecesarios
```

### DIP - Dependency Inversion Principle

```
✅ Use Cases dependen de IScreenRepository (abstracción)
   NO de InMemoryScreenRepository (implementación)

✅ Presentation Layer depende de IScreenService (abstracción)
   NO de ScreenApplicationService directamente

High-level modules NO depend on low-level modules.
Both depend on ABSTRACTIONS.
```

---

## 📦 Component Hierarchy

```
App.tsx
  └─ useHomeScreen() ────> getScreenService()
       │                        │
       │                        └──> HttpScreenRepository
       │                                  │
       │                                  └──> Backend API
       ↓
  <ScreenView screen={screen}>
       │
       └─ components.map()
            │
            └─> <ComponentRenderer component={comp}>
                     │
                     ├─ case 'button': <Button />
                     ├─ case 'input': <Input />
                     ├─ case 'alert': <Alert />
                     └─ case 'container': <Container>
                                            └─ recursive children
```

---

## 🧪 Testing Layers

```
┌──────────────────────────────────────────────────┐
│          Unit Tests (Domain Layer)                │
│  - ScreenEntity.test.ts                          │
│  - ComponentEntity.test.ts                       │
│  - ScreenValidatorService.test.ts                │
└──────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────┐
│    Integration Tests (Application Layer)         │
│  - GetScreenByIdUseCase.test.ts                  │
│  - ScreenMapper.test.ts                          │
│  - ScreenApplicationService.test.ts              │
└──────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────┐
│       E2E Tests (Full Stack)                     │
│  - screen.e2e.test.ts                            │
│  - user-flow.e2e.test.ts                         │
└──────────────────────────────────────────────────┘
```

---

## 🎨 Color Legend

| Color | Layer | Responsibility |
|-------|-------|----------------|
| 🔵 | **Domain** | Core business logic, entities, value objects |
| 🟢 | **Application** | Use cases, orchestration, DTOs |
| 🔴 | **Infrastructure** | Adapters, repositories, frameworks |
| 🟡 | **Presentation** | UI components, hooks (frontend only) |

---

## 📊 Dependency Graph

```
┌─────────────────────────────────────────────┐
│         External Dependencies                │
│  (React, NestJS, Express, HTTP)             │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│       🔴 Infrastructure Layer                │
│  (Controllers, Repositories, DI)            │
└────────────────┬────────────────────────────┘
                 │
                 ↓ depends on
┌─────────────────────────────────────────────┐
│       🟢 Application Layer                   │
│  (Use Cases, Services, Mappers)             │
└────────────────┬────────────────────────────┘
                 │
                 ↓ depends on
┌─────────────────────────────────────────────┐
│       🔵 Domain Layer (CORE)                 │
│  (Entities, Value Objects, Ports)           │
│  NO DEPENDENCIES - Pure Business Logic      │
└─────────────────────────────────────────────┘
```

---

Esta arquitectura garantiza:
- ✅ **Separation of Concerns**
- ✅ **Testability**
- ✅ **Maintainability**
- ✅ **Scalability**
- ✅ **Framework Independence**
- ✅ **SOLID Compliance**
