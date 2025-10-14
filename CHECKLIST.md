# ✅ Checklist de Instalación y Verificación

## 📋 Pre-requisitos

- [ ] Node.js instalado (v20.19+ o v22.12+)
- [ ] npm instalado
- [ ] Editor de código (VS Code recomendado)
- [ ] Terminal/PowerShell disponible

## 🚀 Pasos de Instalación

### 1. Backend

```powershell
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Verificar que se instaló correctamente
npm run build

# ✅ Si compila sin errores, el backend está listo
```

### 2. Frontend

```powershell
# Navegar a la carpeta frontend (desde la raíz)
cd frontend

# Instalar dependencias
npm install

# Verificar que se instaló correctamente
npm run build

# ✅ Si compila sin errores, el frontend está listo
```

## 🧪 Verificación de Componentes

### Backend

- [ ] Archivo `src/sdui/types/component.types.ts` existe
- [ ] Archivo `src/sdui/sdui.sdk.ts` existe
- [ ] Archivo `src/sdui/sdui.service.ts` existe
- [ ] Archivo `src/sdui/sdui.controller.ts` existe
- [ ] Archivo `src/sdui/sdui.module.ts` existe
- [ ] Archivo `src/sdui/sdui.examples.ts` existe
- [ ] Archivo `src/main.ts` tiene CORS configurado

### Frontend

- [ ] Archivo `src/types/sdui.types.ts` existe
- [ ] Archivo `src/services/sdui.client.ts` existe
- [ ] Archivo `src/components/Button.tsx` existe
- [ ] Archivo `src/components/Input.tsx` existe
- [ ] Archivo `src/components/Alert.tsx` existe
- [ ] Archivo `src/components/Container.tsx` existe
- [ ] Archivo `src/components/ComponentRenderer.tsx` existe
- [ ] Archivo `src/App.tsx` está actualizado

## 🔥 Primera Ejecución

### Terminal 1 - Backend

```powershell
cd backend
npm run start:dev
```

**Verificar:**
- [ ] El servidor inicia en puerto 3000
- [ ] Mensaje "Backend is running on: http://localhost:3000" aparece
- [ ] No hay errores en la consola

### Terminal 2 - Frontend

```powershell
cd frontend
npm run dev
```

**Verificar:**
- [ ] El servidor inicia en puerto 5173
- [ ] Mensaje "Local: http://localhost:5173/" aparece
- [ ] No hay errores en la consola

### Navegador

1. Abrir `http://localhost:5173`

**Verificar:**
- [ ] La página carga correctamente
- [ ] Se muestra el título "Welcome to SDUI"
- [ ] Se ve una alerta azul informativa
- [ ] Se ven campos de input (Name, Email)
- [ ] Se ve un botón "Submit Form"
- [ ] Se ve otra alerta verde
- [ ] Todo es responsive (prueba redimensionar la ventana)

## 🧪 Pruebas de Funcionalidad

### 1. Modificar Props desde Backend

**Editar:** `backend/src/sdui/sdui.service.ts`

Cambiar:
```typescript
.addButton('submit-btn', {
  label: 'Submit Form',
  variant: 'primary',  // ← Cambiar a 'success'
  size: 'large',
  fullWidth: true,
})
```

**Verificar:**
- [ ] Guardar archivo
- [ ] Backend se reinicia automáticamente
- [ ] Recargar página (F5)
- [ ] El botón ahora es verde (variant: success)

### 2. Agregar Nuevo Componente

**Agregar en `getHomeScreen()`:**
```typescript
.addAlert('new-alert', {
  message: 'Esta es una nueva alerta agregada!',
  type: 'warning',
  icon: true,
})
```

**Verificar:**
- [ ] Guardar archivo
- [ ] Recargar página
- [ ] Nueva alerta amarilla aparece

### 3. Probar Different Endpoints

**En el navegador:**

1. Abrir: `http://localhost:3000/sdui/screen/home`
   - [ ] Retorna JSON con configuración de pantalla

2. Abrir: `http://localhost:3000/sdui/screen/dashboard`
   - [ ] Retorna JSON con configuración de dashboard

## 📱 Pruebas Responsive

**En el navegador:**

1. Desktop (> 1024px)
   - [ ] Layout se ve bien
   - [ ] Componentes tienen buen espaciado

2. Tablet (768px - 1024px)
   - [ ] Containers horizontales se mantienen
   - [ ] Texto es legible

3. Mobile (< 768px)
   - [ ] Containers horizontales se vuelven verticales
   - [ ] Botones ocupan todo el ancho
   - [ ] Texto se adapta correctamente

**Usar DevTools:**
- [ ] F12 → Toggle device toolbar
- [ ] Probar diferentes tamaños

## 🎨 Verificación de Estilos

**En el navegador:**

### Botones
- [ ] Primary = Azul
- [ ] Secondary = Gris
- [ ] Success = Verde
- [ ] Danger = Rojo
- [ ] Warning = Naranja

### Alertas
- [ ] Info = Azul claro
- [ ] Success = Verde claro
- [ ] Warning = Amarillo claro
- [ ] Error = Rojo claro

### Inputs
- [ ] Focus cambia borde a azul
- [ ] Label está arriba del input
- [ ] Placeholder es visible
- [ ] Required muestra asterisco rojo

## 🔍 Verificación de Consola

**Backend (Terminal 1):**
- [ ] No hay errores rojos
- [ ] No hay warnings críticos
- [ ] Logs indican que el servidor está corriendo

**Frontend (Terminal 2):**
- [ ] No hay errores de compilación
- [ ] No hay warnings de TypeScript críticos

**Navegador (F12 → Console):**
- [ ] No hay errores rojos
- [ ] No hay errores de red (Network tab)
- [ ] Request a `/sdui/screen/home` es exitoso (Status 200)

## 📚 Verificación de Documentación

- [ ] README.md está completo
- [ ] QUICK_START.md existe
- [ ] PROJECT_STRUCTURE.md existe
- [ ] ARCHITECTURE.md existe
- [ ] SUMMARY.md existe
- [ ] Todos los archivos .example existen

## ✅ Lista Final

Si todos los checks están marcados:

🎉 **¡Tu aplicación SDUI está completamente funcional!**

Puedes empezar a:
1. Explorar ejemplos en `sdui.examples.ts`
2. Modificar `sdui.service.ts`
3. Crear tus propias pantallas
4. Extender con nuevos componentes

## 🆘 Problemas Comunes

### Error: "Cannot find module"
**Solución:**
```powershell
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"
**Solución:**
```powershell
# Cambiar puerto en backend/src/main.ts
await app.listen(3001);
```

### Error: CORS
**Solución:**
- Verificar que backend esté en puerto 3000
- Verificar configuración en `backend/src/main.ts`

### Frontend no se conecta al Backend
**Solución:**
1. Verificar que backend esté corriendo
2. Verificar URL en `frontend/src/services/sdui.client.ts`
3. Verificar Network tab en DevTools

## 📞 Soporte

Si algo no funciona:

1. Revisa la consola del backend
2. Revisa la consola del frontend
3. Revisa la consola del navegador (F12)
4. Consulta el README.md
5. Revisa los ejemplos en `sdui.examples.ts`

---

**¡Disfruta tu aplicación SDUI! 🚀**
