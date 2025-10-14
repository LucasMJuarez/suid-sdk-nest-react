# SDUI (Server-Driven UI) SDK

Un SDK completo que implementa el patrón Server-Driven UI (SDUI) permitiendo controlar completamente la interfaz de usuario del frontend desde el backend.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Inicio Rápido](#inicio-rápido)
- [Uso del SDK SDUI](#uso-del-sdk-sdui)
- [Componentes Disponibles](#componentes-disponibles)
- [Ejemplos Prácticos](#ejemplos-prácticos)
- [API Reference](#api-reference)
- [Personalización](#personalización)

## ✨ Características

- 🎨 **Control Total desde Backend**: Modifica la UI sin desplegar frontend
- 🧩 **Componentes Reutilizables**: Botones, Inputs, Alerts y Containers
- 📱 **Diseño Responsive**: Optimizado para mobile, tablet y desktop
- 🔧 **TypeScript**: Tipado completo en frontend y backend
- 🚀 **Fácil de Usar**: SDK con builder pattern intuitivo
- ⚡ **Performance**: Rendering eficiente con React
- 🎯 **Type-Safe**: Validación de tipos en tiempo de compilación

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Button   │  │   Input    │  │   Alert    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│         ▲                 ▲                 ▲                │
│         └─────────────────┴─────────────────┘                │
│                           │                                  │
│                  ┌────────────────┐                          │
│                  │ SDUI Client    │                          │
│                  └────────────────┘                          │
└─────────────────────────│────────────────────────────────────┘
                          │ HTTP/JSON
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                       Backend (NestJS)                       │
│                  ┌────────────────┐                          │
│                  │ SDUI SDK       │                          │
│                  │ (Builder)      │                          │
│                  └────────────────┘                          │
│                          │                                   │
│                  ┌────────────────┐                          │
│                  │ SDUI Service   │                          │
│                  └────────────────┘                          │
│                          │                                   │
│                  ┌────────────────┐                          │
│                  │ SDUI Controller│                          │
│                  └────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Instalación

### Requisitos Previos

- Node.js (v20.19+ o v22.12+)
- npm o yarn

### Clonar el Proyecto

```bash
git clone <repository-url>
cd Suid
```

### Instalar Dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## 🚀 Inicio Rápido

### 1. Iniciar el Backend

```bash
cd backend
npm run start:dev
```

El backend estará disponible en `http://localhost:3000`

### 2. Iniciar el Frontend

```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 3. Abrir en el Navegador

Navega a `http://localhost:5173` y verás la interfaz generada desde el backend.

## 🎯 Uso del SDK SDUI

### Importar el SDK

```typescript
import { createScreen } from './sdui/sdui.sdk';
```

### Crear una Pantalla Básica

```typescript
const screen = createScreen('home', 'Home Screen')
  .withMetadata('Bienvenido', 'Pantalla de inicio')
  .addAlert('welcome', {
    message: 'Bienvenido a SDUI',
    type: 'info',
    dismissible: true,
  })
  .addButton('btn-1', {
    label: 'Click Me',
    variant: 'primary',
    size: 'large',
  })
  .build();
```

### Modificar Props desde el Backend

Edita el archivo `backend/src/sdui/sdui.service.ts`:

```typescript
@Injectable()
export class SduiService {
  getHomeScreen(): Screen {
    return createScreen('home', 'Home Screen')
      .withMetadata('Mi App', 'Descripción de mi app')
      
      // Agregar una alerta
      .addAlert('info-alert', {
        message: 'Esta alerta se controla desde el backend',
        type: 'success',  // Cambiar a: 'info', 'warning', 'error'
        title: 'Título de la Alerta',
        dismissible: true,
        icon: true,
      })
      
      // Agregar un input
      .addInput('email', {
        label: 'Email',
        type: 'email',
        placeholder: 'usuario@ejemplo.com',
        required: true,
        fullWidth: true,
      })
      
      // Agregar un botón
      .addButton('submit', {
        label: 'Enviar Formulario',
        variant: 'primary',  // Cambiar a: 'secondary', 'success', 'danger', 'warning'
        size: 'large',       // Cambiar a: 'small', 'medium'
        fullWidth: true,
        disabled: false,
      })
      
      .build();
  }
}
```

## 🧩 Componentes Disponibles

### 1. Button (Botón)

```typescript
.addButton('button-id', {
  label: string,              // Texto del botón
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning',
  size?: 'small' | 'medium' | 'large',
  disabled?: boolean,         // true para deshabilitar
  fullWidth?: boolean,        // true para ancho completo
})
```

**Ejemplo:**
```typescript
.addButton('save-btn', {
  label: 'Guardar Cambios',
  variant: 'success',
  size: 'large',
  fullWidth: true,
})
```

### 2. Input (Campo de Entrada)

```typescript
.addInput('input-id', {
  label?: string,             // Etiqueta del campo
  type?: 'text' | 'email' | 'password' | 'number' | 'tel',
  placeholder?: string,       // Texto de ayuda
  value?: string,             // Valor inicial
  disabled?: boolean,
  required?: boolean,         // true para campo obligatorio
  fullWidth?: boolean,
  error?: string,             // Mensaje de error
})
```

**Ejemplo:**
```typescript
.addInput('username', {
  label: 'Nombre de Usuario',
  type: 'text',
  placeholder: 'Ingrese su usuario',
  required: true,
  fullWidth: true,
})
```

### 3. Alert (Alerta)

```typescript
.addAlert('alert-id', {
  message: string,            // Mensaje de la alerta
  type?: 'info' | 'success' | 'warning' | 'error',
  title?: string,             // Título opcional
  dismissible?: boolean,      // true para permitir cerrar
  icon?: boolean,             // true para mostrar icono
})
```

**Ejemplo:**
```typescript
.addAlert('success-msg', {
  message: 'Operación completada exitosamente',
  type: 'success',
  title: 'Éxito',
  dismissible: true,
  icon: true,
})
```

### 4. Container (Contenedor)

```typescript
.addContainer('container-id', {
  layout?: 'vertical' | 'horizontal' | 'grid',
  gap?: 'small' | 'medium' | 'large',
  padding?: 'small' | 'medium' | 'large',
  children?: UIComponent[],   // Componentes hijos
})
```

**Ejemplo:**
```typescript
.addContainer('form-container', {
  layout: 'vertical',
  gap: 'medium',
  padding: 'large',
  children: [
    {
      id: 'name-input',
      type: 'input',
      props: {
        label: 'Nombre',
        type: 'text',
        fullWidth: true,
      },
    },
    {
      id: 'submit-btn',
      type: 'button',
      props: {
        label: 'Enviar',
        variant: 'primary',
      },
    },
  ],
})
```

## 💡 Ejemplos Prácticos

### Ejemplo 1: Formulario de Login

```typescript
getLoginScreen(): Screen {
  return createScreen('login', 'Login')
    .withMetadata('Iniciar Sesión', 'Ingrese sus credenciales')
    .addAlert('welcome', {
      message: 'Bienvenido de nuevo',
      type: 'info',
      icon: true,
    })
    .addInput('email', {
      label: 'Email',
      type: 'email',
      placeholder: 'correo@ejemplo.com',
      required: true,
      fullWidth: true,
    })
    .addInput('password', {
      label: 'Contraseña',
      type: 'password',
      placeholder: 'Ingrese su contraseña',
      required: true,
      fullWidth: true,
    })
    .addButton('login-btn', {
      label: 'Iniciar Sesión',
      variant: 'primary',
      size: 'large',
      fullWidth: true,
    })
    .build();
}
```

### Ejemplo 2: Dashboard con Acciones

```typescript
getDashboard(): Screen {
  return createScreen('dashboard', 'Dashboard')
    .withMetadata('Panel de Control', 'Gestione sus recursos')
    .addAlert('stats', {
      message: 'Tiene 5 notificaciones nuevas',
      type: 'info',
      dismissible: true,
    })
    .addContainer('actions', {
      layout: 'horizontal',
      gap: 'small',
      children: [
        {
          id: 'create',
          type: 'button',
          props: { label: 'Crear', variant: 'primary' },
        },
        {
          id: 'edit',
          type: 'button',
          props: { label: 'Editar', variant: 'secondary' },
        },
        {
          id: 'delete',
          type: 'button',
          props: { label: 'Eliminar', variant: 'danger' },
        },
      ],
    })
    .build();
}
```

### Ejemplo 3: Formulario de Contacto

```typescript
getContactForm(): Screen {
  return createScreen('contact', 'Contacto')
    .withMetadata('Contáctanos', 'Envíanos un mensaje')
    .addInput('name', {
      label: 'Nombre Completo',
      type: 'text',
      required: true,
      fullWidth: true,
    })
    .addInput('email', {
      label: 'Email',
      type: 'email',
      required: true,
      fullWidth: true,
    })
    .addInput('phone', {
      label: 'Teléfono',
      type: 'tel',
      placeholder: '+34 600 000 000',
      fullWidth: true,
    })
    .addButton('send', {
      label: 'Enviar Mensaje',
      variant: 'success',
      size: 'large',
      fullWidth: true,
    })
    .build();
}
```

## 📚 API Reference

### Endpoints del Backend

#### GET `/sdui/screen/home`
Obtiene la configuración de la pantalla principal.

**Response:**
```json
{
  "screen": {
    "id": "home",
    "name": "Home Screen",
    "components": [...],
    "metadata": {
      "title": "...",
      "description": "..."
    }
  },
  "timestamp": 1234567890
}
```

#### GET `/sdui/screen/:screenId`
Obtiene una pantalla por su ID.

**Parameters:**
- `screenId`: ID de la pantalla

#### GET `/sdui/dynamic-form?fields=name:text,email:email`
Genera un formulario dinámico.

**Query Parameters:**
- `fields`: Lista de campos separados por comas (formato: `nombre:tipo`)

### SDK Builder Methods

#### `createScreen(id, name)`
Crea un nuevo builder de pantalla.

#### `.withMetadata(title?, description?)`
Añade metadatos a la pantalla.

#### `.addButton(id, props)`
Añade un botón.

#### `.addInput(id, props)`
Añade un campo de entrada.

#### `.addAlert(id, props)`
Añade una alerta.

#### `.addContainer(id, props)`
Añade un contenedor.

#### `.build()`
Construye y retorna el objeto Screen final.

## 🎨 Personalización

### Cambiar Colores

Edita `frontend/src/index.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Azul */
  --color-success: #10b981;      /* Verde */
  --color-danger: #ef4444;       /* Rojo */
  --color-warning: #f59e0b;      /* Naranja */
}
```

### Agregar Nuevos Componentes

1. **Backend**: Define el tipo en `types/component.types.ts`
2. **Backend**: Añade método al SDK en `sdui.sdk.ts`
3. **Frontend**: Crea el componente React en `components/`
4. **Frontend**: Añade el caso en `ComponentRenderer.tsx`

## 🔧 Scripts Disponibles

### Backend
```bash
npm run start        # Iniciar en modo producción
npm run start:dev    # Iniciar en modo desarrollo
npm run build        # Compilar el proyecto
npm run test         # Ejecutar tests
```

### Frontend
```bash
npm run dev          # Iniciar en modo desarrollo
npm run build        # Compilar para producción
npm run preview      # Preview de la build
npm run lint         # Ejecutar linter
```

## 📝 Notas Importantes

1. **Hot Reload**: Los cambios en el backend requieren reiniciar el servidor
2. **CORS**: Ya está configurado para desarrollo (localhost:5173)
3. **TypeScript**: Mantén los tipos sincronizados entre frontend y backend
4. **Responsive**: Todos los componentes son responsive por defecto
5. **Validación**: El frontend valida los tipos recibidos del backend

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Tu Nombre - *Trabajo Inicial*

## 🙏 Agradecimientos

- React Team por React
- NestJS Team por NestJS
- Vite Team por Vite

---

**¡Disfruta construyendo UIs dinámicas con SDUI! 🚀**
