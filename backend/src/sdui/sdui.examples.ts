import { Injectable } from '@nestjs/common';
import { Screen } from './types/component.types';
import { createScreen } from './sdui.sdk';

/**
 * EJEMPLOS DE USO DEL SDK SDUI
 * 
 * Este archivo contiene ejemplos prácticos de cómo crear diferentes pantallas
 * usando el SDK SDUI. Puedes copiar estos ejemplos y modificarlos en sdui.service.ts
 */

@Injectable()
export class SduiExamples {
  /**
   * Ejemplo 1: Formulario de Login Simple
   */
  loginForm(): Screen {
    return createScreen('login', 'Login')
      .withMetadata('Iniciar Sesión', 'Ingrese sus credenciales')
      .addAlert('welcome', {
        message: 'Bienvenido de vuelta. Por favor, inicie sesión.',
        type: 'info',
        icon: true,
      })
      .addInput('email', {
        label: 'Correo Electrónico',
        type: 'email',
        placeholder: 'usuario@ejemplo.com',
        required: true,
        fullWidth: true,
      })
      .addInput('password', {
        label: 'Contraseña',
        type: 'password',
        placeholder: '••••••••',
        required: true,
        fullWidth: true,
      })
      .addButton('submit', {
        label: 'Iniciar Sesión',
        variant: 'primary',
        size: 'large',
        fullWidth: true,
      })
      .build();
  }

  /**
   * Ejemplo 2: Formulario de Registro
   */
  registrationForm(): Screen {
    return createScreen('register', 'Registro')
      .withMetadata('Crear Cuenta', 'Complete el formulario para registrarse')
      .addInput('fullname', {
        label: 'Nombre Completo',
        type: 'text',
        placeholder: 'Juan Pérez',
        required: true,
        fullWidth: true,
      })
      .addInput('email', {
        label: 'Correo Electrónico',
        type: 'email',
        placeholder: 'juan@ejemplo.com',
        required: true,
        fullWidth: true,
      })
      .addInput('phone', {
        label: 'Teléfono',
        type: 'tel',
        placeholder: '+34 600 000 000',
        fullWidth: true,
      })
      .addInput('password', {
        label: 'Contraseña',
        type: 'password',
        placeholder: 'Mínimo 8 caracteres',
        required: true,
        fullWidth: true,
      })
      .addInput('confirm-password', {
        label: 'Confirmar Contraseña',
        type: 'password',
        placeholder: 'Repita la contraseña',
        required: true,
        fullWidth: true,
      })
      .addButton('register', {
        label: 'Crear Cuenta',
        variant: 'success',
        size: 'large',
        fullWidth: true,
      })
      .build();
  }

  /**
   * Ejemplo 3: Dashboard con Alertas y Acciones
   */
  dashboard(): Screen {
    return createScreen('dashboard', 'Dashboard')
      .withMetadata('Panel de Control', 'Resumen de su cuenta')
      .addAlert('welcome', {
        message: 'Bienvenido a su dashboard. Tiene 5 notificaciones nuevas.',
        type: 'info',
        title: 'Bienvenido',
        dismissible: true,
        icon: true,
      })
      .addAlert('warning', {
        message: 'Su suscripción vence en 7 días',
        type: 'warning',
        title: 'Atención',
        icon: true,
      })
      .addContainer('actions', {
        layout: 'horizontal',
        gap: 'medium',
        padding: 'medium',
        children: [
          {
            id: 'create',
            type: 'button' as any,
            props: {
              label: 'Crear Nuevo',
              variant: 'primary',
              size: 'medium',
            },
          },
          {
            id: 'edit',
            type: 'button' as any,
            props: {
              label: 'Editar',
              variant: 'secondary',
              size: 'medium',
            },
          },
          {
            id: 'delete',
            type: 'button' as any,
            props: {
              label: 'Eliminar',
              variant: 'danger',
              size: 'medium',
            },
          },
        ],
      })
      .build();
  }

  /**
   * Ejemplo 4: Formulario de Contacto
   */
  contactForm(): Screen {
    return createScreen('contact', 'Contacto')
      .withMetadata('Contáctenos', 'Estamos aquí para ayudarle')
      .addAlert('info', {
        message: 'Responderemos a su mensaje en un plazo de 24 horas',
        type: 'info',
        icon: true,
      })
      .addContainer('form', {
        layout: 'vertical',
        gap: 'medium',
        padding: 'large',
        children: [
          {
            id: 'name',
            type: 'input' as any,
            props: {
              label: 'Nombre',
              type: 'text',
              placeholder: 'Su nombre',
              required: true,
              fullWidth: true,
            },
          },
          {
            id: 'email',
            type: 'input' as any,
            props: {
              label: 'Email',
              type: 'email',
              placeholder: 'su@email.com',
              required: true,
              fullWidth: true,
            },
          },
          {
            id: 'subject',
            type: 'input' as any,
            props: {
              label: 'Asunto',
              type: 'text',
              placeholder: 'Motivo del contacto',
              required: true,
              fullWidth: true,
            },
          },
        ],
      })
      .addButton('send', {
        label: 'Enviar Mensaje',
        variant: 'primary',
        size: 'large',
        fullWidth: true,
      })
      .build();
  }

  /**
   * Ejemplo 5: Página de Error
   */
  errorPage(): Screen {
    return createScreen('error', 'Error')
      .withMetadata('Error 404', 'Página no encontrada')
      .addAlert('error', {
        message: 'Lo sentimos, la página que busca no existe.',
        type: 'error',
        title: 'Error 404',
        icon: true,
      })
      .addButton('home', {
        label: 'Volver al Inicio',
        variant: 'primary',
        size: 'large',
      })
      .build();
  }

  /**
   * Ejemplo 6: Página de Éxito
   */
  successPage(): Screen {
    return createScreen('success', 'Éxito')
      .withMetadata('¡Éxito!', 'Operación completada')
      .addAlert('success', {
        message: 'Su operación se ha completado exitosamente. Recibirá un email de confirmación.',
        type: 'success',
        title: '¡Perfecto!',
        icon: true,
        dismissible: false,
      })
      .addContainer('actions', {
        layout: 'horizontal',
        gap: 'small',
        children: [
          {
            id: 'continue',
            type: 'button' as any,
            props: {
              label: 'Continuar',
              variant: 'primary',
            },
          },
          {
            id: 'home',
            type: 'button' as any,
            props: {
              label: 'Ir al Inicio',
              variant: 'secondary',
            },
          },
        ],
      })
      .build();
  }

  /**
   * Ejemplo 7: Configuración de Perfil
   */
  profileSettings(): Screen {
    return createScreen('profile', 'Perfil')
      .withMetadata('Configuración de Perfil', 'Actualice su información personal')
      .addAlert('info', {
        message: 'Los cambios se guardarán automáticamente',
        type: 'info',
        icon: true,
      })
      .addInput('name', {
        label: 'Nombre Completo',
        type: 'text',
        value: 'Juan Pérez',
        fullWidth: true,
      })
      .addInput('email', {
        label: 'Email',
        type: 'email',
        value: 'juan@ejemplo.com',
        fullWidth: true,
      })
      .addInput('phone', {
        label: 'Teléfono',
        type: 'tel',
        value: '+34 600 000 000',
        fullWidth: true,
      })
      .addContainer('buttons', {
        layout: 'horizontal',
        gap: 'medium',
        children: [
          {
            id: 'cancel',
            type: 'button' as any,
            props: {
              label: 'Cancelar',
              variant: 'secondary',
            },
          },
          {
            id: 'save',
            type: 'button' as any,
            props: {
              label: 'Guardar Cambios',
              variant: 'success',
            },
          },
        ],
      })
      .build();
  }

  /**
   * Ejemplo 8: Grid de Acciones
   */
  actionGrid(): Screen {
    return createScreen('actions', 'Acciones')
      .withMetadata('Panel de Acciones', 'Seleccione una acción')
      .addContainer('grid', {
        layout: 'grid',
        gap: 'large',
        padding: 'large',
        children: [
          {
            id: 'btn-1',
            type: 'button' as any,
            props: {
              label: 'Crear',
              variant: 'primary',
              size: 'large',
              fullWidth: true,
            },
          },
          {
            id: 'btn-2',
            type: 'button' as any,
            props: {
              label: 'Editar',
              variant: 'secondary',
              size: 'large',
              fullWidth: true,
            },
          },
          {
            id: 'btn-3',
            type: 'button' as any,
            props: {
              label: 'Ver',
              variant: 'success',
              size: 'large',
              fullWidth: true,
            },
          },
          {
            id: 'btn-4',
            type: 'button' as any,
            props: {
              label: 'Eliminar',
              variant: 'danger',
              size: 'large',
              fullWidth: true,
            },
          },
        ],
      })
      .build();
  }
}
