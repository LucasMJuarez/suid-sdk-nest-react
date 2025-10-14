# 🚀 Guía Rápida - Cómo Cambiar Props del Frontend

Esta guía te muestra cómo modificar la interfaz del frontend directamente desde el backend usando el SDK SDUI.

## 📍 Archivo Principal a Editar

El archivo principal que debes modificar es:

```
backend/src/sdui/sdui.service.ts
```

## 🎯 Pasos Básicos

### 1. Abrir el Archivo del Servicio

Navega a `backend/src/sdui/sdui.service.ts`

### 2. Encontrar el Método que Quieres Modificar

```typescript
getHomeScreen(): Screen {
  return createScreen('home', 'Home Screen')
    // Aquí van tus componentes
    .build();
}
```

### 3. Modificar o Agregar Componentes

Usa el builder pattern para agregar/modificar componentes:

```typescript
.addButton('mi-boton', {
  label: 'Mi Nuevo Botón',
  variant: 'primary',
  size: 'large',
})
```

### 4. Guardar y Ver Cambios

- Guarda el archivo
- El backend se reiniciará automáticamente (si usas `npm run start:dev`)
- Recarga la página del frontend
- ¡Verás tus cambios!

## 💡 Ejemplos Rápidos

### Cambiar el Texto de un Botón

**Antes:**
```typescript
.addButton('submit', {
  label: 'Submit',
  variant: 'primary',
})
```

**Después:**
```typescript
.addButton('submit', {
  label: 'Enviar Ahora',  // ✅ Texto cambiado
  variant: 'primary',
})
```

### Cambiar el Color de un Botón

```typescript
.addButton('delete', {
  label: 'Eliminar',
  variant: 'danger',  // Cambia a: 'primary', 'secondary', 'success', 'warning'
})
```

### Agregar un Nuevo Input

```typescript
.addInput('telefono', {
  label: 'Número de Teléfono',
  type: 'tel',
  placeholder: '+34 600 000 000',
  required: true,
  fullWidth: true,
})
```

### Cambiar el Tipo de una Alerta

```typescript
.addAlert('mensaje', {
  message: 'Operación exitosa',
  type: 'success',  // Cambia a: 'info', 'warning', 'error'
  title: 'Éxito',
})
```

### Organizar Componentes en un Contenedor

```typescript
.addContainer('formulario', {
  layout: 'vertical',  // o 'horizontal', 'grid'
  gap: 'medium',
  padding: 'large',
  children: [
    {
      id: 'input-1',
      type: 'input',
      props: {
        label: 'Campo 1',
        type: 'text',
      },
    },
    {
      id: 'input-2',
      type: 'input',
      props: {
        label: 'Campo 2',
        type: 'email',
      },
    },
  ],
})
```

## 🎨 Todas las Variantes Disponibles

### Botones
- `variant`: `'primary'` | `'secondary'` | `'success'` | `'danger'` | `'warning'`
- `size`: `'small'` | `'medium'` | `'large'`

### Inputs
- `type`: `'text'` | `'email'` | `'password'` | `'number'` | `'tel'`

### Alertas
- `type`: `'info'` | `'success'` | `'warning'` | `'error'`

### Contenedores
- `layout`: `'vertical'` | `'horizontal'` | `'grid'`
- `gap`: `'small'` | `'medium'` | `'large'`
- `padding`: `'small'` | `'medium'` | `'large'`

## 🔄 Flujo Completo de Cambios

```
1. Editar backend/src/sdui/sdui.service.ts
   ↓
2. Guardar archivo
   ↓
3. Backend se reinicia automáticamente
   ↓
4. Recargar frontend (F5)
   ↓
5. Ver cambios reflejados ✨
```

## 📝 Ejemplo Completo

Aquí hay un ejemplo completo de una pantalla personalizada:

```typescript
getCustomScreen(): Screen {
  return createScreen('custom', 'Mi Pantalla Personalizada')
    .withMetadata(
      'Título Personalizado',
      'Esta es una descripción personalizada'
    )
    
    // Alerta de bienvenida
    .addAlert('bienvenida', {
      message: '¡Bienvenido a mi aplicación personalizada!',
      type: 'info',
      title: 'Hola',
      dismissible: true,
      icon: true,
    })
    
    // Campo de nombre
    .addInput('nombre', {
      label: 'Nombre Completo',
      type: 'text',
      placeholder: 'Juan Pérez',
      required: true,
      fullWidth: true,
    })
    
    // Campo de email
    .addInput('email', {
      label: 'Correo Electrónico',
      type: 'email',
      placeholder: 'juan@ejemplo.com',
      required: true,
      fullWidth: true,
    })
    
    // Campo de teléfono
    .addInput('telefono', {
      label: 'Teléfono',
      type: 'tel',
      placeholder: '+34 600 000 000',
      fullWidth: true,
    })
    
    // Contenedor de botones
    .addContainer('botones', {
      layout: 'horizontal',
      gap: 'small',
      children: [
        {
          id: 'cancelar',
          type: 'button',
          props: {
            label: 'Cancelar',
            variant: 'secondary',
          },
        },
        {
          id: 'guardar',
          type: 'button',
          props: {
            label: 'Guardar',
            variant: 'success',
          },
        },
      ],
    })
    
    // Mensaje de éxito
    .addAlert('exito', {
      message: 'Los cambios se guardarán automáticamente',
      type: 'success',
      icon: true,
    })
    
    .build();
}
```

## 🆘 Solución de Problemas

### Los cambios no se reflejan

1. Verifica que el backend esté corriendo
2. Recarga la página del frontend (F5)
3. Revisa la consola del navegador por errores
4. Verifica que la sintaxis TypeScript sea correcta

### Error de TypeScript

- Asegúrate de que las props coincidan con los tipos definidos
- Verifica que los valores sean del tipo correcto (string, boolean, etc.)

### El backend no se reinicia

- Detén el servidor (`Ctrl + C`)
- Vuelve a ejecutar: `npm run start:dev`

## 🎓 Recursos Adicionales

- Consulta el `README.md` principal para documentación completa
- Revisa los ejemplos en `backend/src/sdui/sdui.service.ts`
- Mira los tipos en `backend/src/sdui/types/component.types.ts`

---

**¿Preguntas?** Revisa el README principal o la documentación del código.
