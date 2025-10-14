# 🏗️ Arquitectura SDUI - Diagramas

## 📊 Flujo de Datos Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
│                    (Navegador Web)                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ 1. Visita http://localhost:5173
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      App.tsx                                │ │
│  │  • Estado: loading, screen, error                           │ │
│  │  • useEffect → llama a sduiClient                           │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│                           │ 2. Llama a getHomeScreen()           │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              services/sdui.client.ts                        │ │
│  │  • Hace fetch a http://localhost:3000/sdui/screen/home     │ │
│  └────────────────────────┬───────────────────────────────────┘ │
└───────────────────────────┼──────────────────────────────────────┘
                           │
                           │ 3. HTTP GET Request
                           │
┌───────────────────────────▼──────────────────────────────────────┐
│                      BACKEND (NestJS)                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              sdui/sdui.controller.ts                        │ │
│  │  @Get('screen/home')                                        │ │
│  │  • Recibe petición HTTP                                     │ │
│  │  • Llama a sduiService.getHomeScreen()                      │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│                           │ 4. Llama al service                  │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              sdui/sdui.service.ts                           │ │
│  │  getHomeScreen(): Screen {                                  │ │
│  │    return createScreen(...)                                 │ │
│  │      .addAlert(...)                                         │ │
│  │      .addInput(...)                                         │ │
│  │      .addButton(...)                                        │ │
│  │      .build()                                               │ │
│  │  }                                                           │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│                           │ 5. Usa el SDK Builder                │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              sdui/sdui.sdk.ts                               │ │
│  │  class SDUIBuilder {                                        │ │
│  │    addButton(id, props) { ... }                             │ │
│  │    addInput(id, props) { ... }                              │ │
│  │    addAlert(id, props) { ... }                              │ │
│  │    build(): Screen { ... }                                  │ │
│  │  }                                                           │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│                           │ 6. Retorna Screen object             │
│                           │                                      │
│  ┌────────────────────────▼───────────────────────────────────┐ │
│  │           Controller: SDUIResponse                          │ │
│  │  {                                                           │ │
│  │    screen: {                                                │ │
│  │      id: "home",                                            │ │
│  │      components: [...],                                     │ │
│  │      metadata: {...}                                        │ │
│  │    },                                                        │ │
│  │    timestamp: 1234567890                                    │ │
│  │  }                                                           │ │
│  └────────────────────────┬───────────────────────────────────┘ │
└───────────────────────────┼──────────────────────────────────────┘
                           │
                           │ 7. JSON Response
                           │
┌───────────────────────────▼──────────────────────────────────────┐
│                      FRONTEND (React)                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      App.tsx                                │ │
│  │  • Recibe SDUIResponse                                      │ │
│  │  • Actualiza estado: setScreen(response.screen)             │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│                           │ 8. Renderiza componentes             │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │     screen.components.map(component =>                      │ │
│  │       <ComponentRenderer component={component} />           │ │
│  │     )                                                        │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│                           │ 9. Switch por tipo                   │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │       components/ComponentRenderer.tsx                      │ │
│  │  switch (component.type) {                                  │ │
│  │    case 'button': return <Button {...props} />             │ │
│  │    case 'input': return <Input {...props} />               │ │
│  │    case 'alert': return <Alert {...props} />               │ │
│  │    case 'container': return <Container {...props} />       │ │
│  │  }                                                           │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│                           │ 10. Renderiza componentes reales     │
│                           ▼                                      │
│  ┌─────────────┬──────────────┬──────────────┬────────────────┐│
│  │   Button    │    Input     │    Alert     │   Container    ││
│  │  .tsx .css  │  .tsx .css   │  .tsx .css   │   .tsx .css    ││
│  └─────────────┴──────────────┴──────────────┴────────────────┘│
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │ 11. Renderizado en DOM
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
│                   Ve la UI en pantalla 🎉                        │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Ciclo de Actualización

```
┌──────────────────────────────────────────────────────────────┐
│  1. DESARROLLADOR                                             │
│     Edita: backend/src/sdui/sdui.service.ts                  │
│     Cambia: .addButton('btn', { variant: 'success' })        │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          │ Guarda archivo
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  2. BACKEND                                                   │
│     NestJS detecta cambio (hot-reload)                        │
│     Reinicia servidor automáticamente                         │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          │ Servidor listo
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  3. USUARIO                                                   │
│     Recarga página (F5) en navegador                          │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          │ Nueva petición HTTP
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  4. BACKEND                                                   │
│     Devuelve nueva configuración con botón 'success'          │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          │ JSON Response
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  5. FRONTEND                                                  │
│     Renderiza botón verde (variant: success) ✨               │
└──────────────────────────────────────────────────────────────┘
```

## 🎨 Jerarquía de Componentes

```
App.tsx
  │
  ├─ Header
  │   ├─ Title (metadata.title)
  │   └─ Subtitle (metadata.description)
  │
  └─ Main Container
      │
      ├─ ComponentRenderer (component 1)
      │   └─ Alert
      │       ├─ Icon
      │       ├─ Title
      │       ├─ Message
      │       └─ Dismiss Button
      │
      ├─ ComponentRenderer (component 2)
      │   └─ Input
      │       ├─ Label
      │       ├─ Input Field
      │       └─ Error Message
      │
      ├─ ComponentRenderer (component 3)
      │   └─ Button
      │       └─ Label
      │
      └─ ComponentRenderer (component 4)
          └─ Container
              ├─ ComponentRenderer (child 1)
              │   └─ Button
              ├─ ComponentRenderer (child 2)
              │   └─ Input
              └─ ComponentRenderer (child 3)
                  └─ Alert
```

## 🔌 API Endpoints

```
Backend: http://localhost:3000

┌────────────────────────────────────────────────────────┐
│  GET /sdui/screen/home                                 │
│  → Pantalla principal                                  │
│  ← { screen: {...}, timestamp: ... }                   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  GET /sdui/screen/dashboard                            │
│  → Pantalla de dashboard                               │
│  ← { screen: {...}, timestamp: ... }                   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  GET /sdui/screen/:screenId                            │
│  → Cualquier pantalla por ID                           │
│  ← { screen: {...}, timestamp: ... }                   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  GET /sdui/dynamic-form?fields=name:text,email:email   │
│  → Formulario dinámico                                 │
│  ← { screen: {...}, timestamp: ... }                   │
└────────────────────────────────────────────────────────┘
```

## 📦 Estructura de Datos

### Screen Object
```typescript
{
  id: "home",
  name: "Home Screen",
  metadata: {
    title: "Welcome",
    description: "Home page"
  },
  components: [
    {
      id: "alert-1",
      type: "alert",
      props: {
        message: "Welcome!",
        type: "info",
        icon: true
      }
    },
    {
      id: "input-1",
      type: "input",
      props: {
        label: "Email",
        type: "email",
        required: true
      }
    },
    {
      id: "button-1",
      type: "button",
      props: {
        label: "Submit",
        variant: "primary"
      }
    }
  ]
}
```

## 🎯 Props de Componentes

### Button Props
```typescript
{
  label: string
  variant: "primary" | "secondary" | "success" | "danger" | "warning"
  size: "small" | "medium" | "large"
  disabled: boolean
  fullWidth: boolean
}
```

### Input Props
```typescript
{
  label: string
  type: "text" | "email" | "password" | "number" | "tel"
  placeholder: string
  required: boolean
  disabled: boolean
  fullWidth: boolean
  error: string
}
```

### Alert Props
```typescript
{
  message: string
  type: "info" | "success" | "warning" | "error"
  title: string
  dismissible: boolean
  icon: boolean
}
```

### Container Props
```typescript
{
  layout: "vertical" | "horizontal" | "grid"
  gap: "small" | "medium" | "large"
  padding: "small" | "medium" | "large"
  children: UIComponent[]
}
```

## 🔒 Type Safety

```
Backend Types              Frontend Types
(TypeScript)               (TypeScript)
     │                          │
     │  Mismo contrato          │
     ├──────────────────────────┤
     │                          │
     ▼                          ▼
ComponentType              ComponentType
ButtonProps                ButtonProps
InputProps                 InputProps
AlertProps                 AlertProps
UIComponent                UIComponent
Screen                     Screen
SDUIResponse               SDUIResponse
```

## 🎨 CSS Architecture

```
index.css (Global)
  ├─ CSS Variables
  │   ├─ Colors
  │   ├─ Spacing
  │   ├─ Border Radius
  │   └─ Shadows
  │
  └─ Base Styles

Button.css (Component)
  ├─ .sdui-button (Base)
  ├─ .sdui-button--primary (Variant)
  ├─ .sdui-button--secondary (Variant)
  ├─ .sdui-button--small (Size)
  └─ @media queries (Responsive)

Input.css (Component)
  ├─ .sdui-input-container
  ├─ .sdui-input
  ├─ .sdui-input-label
  └─ @media queries (Responsive)

Alert.css (Component)
  ├─ .sdui-alert
  ├─ .sdui-alert--info (Type)
  ├─ .sdui-alert--success (Type)
  └─ @keyframes (Animations)

Container.css (Component)
  ├─ .sdui-container
  ├─ .sdui-container--vertical (Layout)
  ├─ .sdui-container--horizontal (Layout)
  └─ @media queries (Responsive)
```

---

**Este diagrama muestra cómo funciona todo el sistema SDUI de principio a fin. 🎯**
