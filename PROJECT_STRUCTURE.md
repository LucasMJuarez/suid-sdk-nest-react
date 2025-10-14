# Estructura del Proyecto SDUI

## 📁 Estructura General

```
Suid/
├── backend/                    # Servidor NestJS
│   ├── src/
│   │   ├── sdui/              # Módulo SDUI
│   │   │   ├── types/         # Definiciones de tipos
│   │   │   │   └── component.types.ts
│   │   │   ├── sdui.sdk.ts    # SDK Builder
│   │   │   ├── sdui.service.ts # Lógica de negocio
│   │   │   ├── sdui.controller.ts # Endpoints API
│   │   │   └── sdui.module.ts # Módulo NestJS
│   │   ├── app.module.ts      # Módulo principal
│   │   └── main.ts            # Entry point
│   └── package.json
│
├── frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   ├── Input.tsx
│   │   │   ├── Input.css
│   │   │   ├── Alert.tsx
│   │   │   ├── Alert.css
│   │   │   ├── Container.tsx
│   │   │   ├── Container.css
│   │   │   ├── ComponentRenderer.tsx
│   │   │   └── index.ts
│   │   ├── services/          # Servicios API
│   │   │   └── sdui.client.ts
│   │   ├── types/             # Definiciones de tipos
│   │   │   └── sdui.types.ts
│   │   ├── App.tsx            # Componente principal
│   │   ├── App.css
│   │   ├── index.css          # Estilos globales
│   │   └── main.tsx           # Entry point
│   └── package.json
│
├── README.md                   # Documentación principal
├── QUICK_START.md             # Guía rápida
└── .gitignore
```

## 🔍 Descripción de Archivos Clave

### Backend

#### `sdui/types/component.types.ts`
Define todos los tipos TypeScript para los componentes SDUI:
- `ComponentType`: Enum con tipos de componentes
- `ButtonProps`, `InputProps`, `AlertProps`, `ContainerProps`: Props de cada componente
- `UIComponent`: Union type de todos los componentes
- `Screen`: Configuración completa de una pantalla
- `SDUIResponse`: Respuesta del API

#### `sdui/sdui.sdk.ts`
SDK principal con builder pattern:
- `SDUIBuilder`: Clase builder
- `createScreen()`: Factory function
- Métodos para agregar componentes
- `build()`: Construye el screen final

#### `sdui/sdui.service.ts`
⭐ **ARCHIVO PRINCIPAL PARA MODIFICAR**
Contiene la lógica de negocio:
- `getHomeScreen()`: Pantalla principal
- `getDashboardScreen()`: Pantalla dashboard
- `getScreen(screenId)`: Obtener pantalla por ID
- `createDynamicForm()`: Generación dinámica

#### `sdui/sdui.controller.ts`
Define los endpoints REST:
- `GET /sdui/screen/home`
- `GET /sdui/screen/dashboard`
- `GET /sdui/screen/:screenId`
- `GET /sdui/dynamic-form`

#### `sdui/sdui.module.ts`
Módulo NestJS que encapsula toda la funcionalidad SDUI.

### Frontend

#### `components/Button.tsx` & `Button.css`
Componente de botón responsive con:
- 5 variantes (primary, secondary, success, danger, warning)
- 3 tamaños (small, medium, large)
- Opción de ancho completo
- Estados disabled

#### `components/Input.tsx` & `Input.css`
Campo de entrada con:
- Múltiples tipos (text, email, password, number, tel)
- Labels y placeholders
- Validación visual
- Mensajes de error
- Estados disabled y required

#### `components/Alert.tsx` & `Alert.css`
Componente de alerta con:
- 4 tipos (info, success, warning, error)
- Título opcional
- Iconos
- Opción dismissible (cerrable)
- Animaciones

#### `components/Container.tsx` & `Container.css`
Contenedor para organizar componentes:
- 3 layouts (vertical, horizontal, grid)
- Espaciado configurable (gap)
- Padding configurable
- Componentes hijos anidados
- Responsive

#### `components/ComponentRenderer.tsx`
⭐ **COMPONENTE CLAVE**
Renderiza dinámicamente componentes según el tipo:
- Switch case para cada tipo de componente
- Pasa props dinámicamente
- Maneja componentes desconocidos

#### `services/sdui.client.ts`
Cliente HTTP para comunicarse con el backend:
- `getScreen(screenId)`: Obtener pantalla
- `getHomeScreen()`: Pantalla principal
- `getDashboardScreen()`: Dashboard
- `getDynamicForm()`: Formulario dinámico
- Manejo de errores

#### `types/sdui.types.ts`
Tipos TypeScript (mirror del backend):
- Mismos tipos que en backend
- Garantiza type-safety

#### `App.tsx`
Componente principal de React:
- Carga datos del backend
- Maneja estados (loading, error, success)
- Renderiza la pantalla
- Muestra metadata

## 🔄 Flujo de Datos

```
1. Frontend inicia
   ↓
2. App.tsx llama a sduiClient.getHomeScreen()
   ↓
3. Cliente HTTP hace GET /sdui/screen/home
   ↓
4. Controller recibe la petición
   ↓
5. Service.getHomeScreen() construye la pantalla usando SDK
   ↓
6. SDK Builder crea objeto Screen con componentes
   ↓
7. Controller devuelve SDUIResponse
   ↓
8. Frontend recibe la configuración
   ↓
9. App.tsx mapea los componentes
   ↓
10. ComponentRenderer renderiza cada componente
    ↓
11. Componentes React muestran la UI
```

## 🎯 Puntos de Entrada para Desarrollo

### Para Cambiar la UI
**Edita:** `backend/src/sdui/sdui.service.ts`

### Para Agregar un Nuevo Componente
1. **Backend:**
   - `types/component.types.ts` → Añadir tipo
   - `sdui.sdk.ts` → Añadir método builder
2. **Frontend:**
   - `components/NuevoComponente.tsx` → Crear componente
   - `ComponentRenderer.tsx` → Añadir case

### Para Modificar Estilos
**Edita:** 
- `frontend/src/index.css` → Estilos globales
- `frontend/src/components/*.css` → Estilos de componente

### Para Añadir Nuevos Endpoints
**Edita:** `backend/src/sdui/sdui.controller.ts`

## 📦 Dependencias Principales

### Backend
- `@nestjs/common` - Framework
- `@nestjs/core` - Core NestJS
- `@nestjs/platform-express` - HTTP server
- `typescript` - Lenguaje

### Frontend
- `react` - UI library
- `react-dom` - React DOM
- `vite` - Build tool
- `typescript` - Lenguaje

## 🚀 Comandos de Desarrollo

```bash
# Backend
cd backend
npm run start:dev    # Desarrollo con hot-reload
npm run build        # Compilar
npm run start        # Producción

# Frontend
cd frontend
npm run dev          # Desarrollo
npm run build        # Compilar
npm run preview      # Preview build
```

## 💡 Tips de Desarrollo

1. **Backend en modo desarrollo**: Usa `npm run start:dev` para hot-reload automático
2. **Frontend en modo desarrollo**: Usa `npm run dev` para ver cambios en tiempo real
3. **Sincronizar tipos**: Mantén los tipos del frontend y backend idénticos
4. **Organización**: Agrupa componentes relacionados en containers
5. **Responsive**: Todos los componentes ya son responsive
6. **Testing**: Recarga el frontend después de cambiar el backend

## 🔐 Seguridad

- CORS configurado solo para desarrollo (localhost:5173)
- En producción, configura CORS apropiadamente
- Valida datos del backend en producción
- Usa variables de entorno para URLs

## 📚 Más Información

- README.md - Documentación completa
- QUICK_START.md - Guía rápida de uso
- Comentarios en el código - Documentación inline
