/**
 * Screen Validator Service - Domain Layer
 * Servicio de dominio para validar pantallas y componentes
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de validación
 * - OCP: Extensible agregando nuevas reglas de validación
 */

import type { ScreenEntity } from '../entities/screen.entity';
import type { ComponentEntity } from '../entities/component.entity';
import { ComponentType } from '../enums/component-type.enum';

export class ScreenValidatorService {
  /**
   * Valida que una pantalla sea completa y correcta
   */
  validateScreen(screen: ScreenEntity): ValidationResult {
    const errors: string[] = [];

    // Validar metadatos
    if (!screen.metadata.title) {
      errors.push('Screen must have a title');
    }

    // Validar componentes
    if (!screen.hasComponents()) {
      errors.push('Screen must have at least one component');
    }

    // Validar cada componente
    screen.components.forEach((component, index) => {
      const componentErrors = this.validateComponent(component);
      if (!componentErrors.isValid) {
        errors.push(...componentErrors.errors.map(
          err => `Component ${index} (${component.id}): ${err}`
        ));
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Valida un componente individual
   */
  validateComponent(component: ComponentEntity): ValidationResult {
    const errors: string[] = [];

    // Validar ID
    if (!component.id) {
      errors.push('Component must have an ID');
    }

    // Validar tipo
    if (!Object.values(ComponentType).includes(component.type)) {
      errors.push(`Invalid component type: ${component.type}`);
    }

    // Validar props según tipo
    switch (component.type) {
      case ComponentType.BUTTON:
        if (!component.getProp('text')) {
          errors.push('Button must have text');
        }
        break;
      case ComponentType.INPUT:
        if (!component.getProp('label')) {
          errors.push('Input must have a label');
        }
        break;
      case ComponentType.ALERT:
        if (!component.getProp('message')) {
          errors.push('Alert must have a message');
        }
        break;
      case ComponentType.CONTAINER:
        // Los containers pueden estar vacíos
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Verifica si una pantalla es accesible
   */
  isAccessible(screen: ScreenEntity): boolean {
    // Verificar que tenga un título descriptivo
    if (!screen.metadata.title || screen.metadata.title.length < 3) {
      return false;
    }

    // Verificar que los inputs tengan labels
    const inputs = screen.components.filter(c => c.type === ComponentType.INPUT);
    return inputs.every(input => input.getProp('label'));
  }
}

/**
 * Resultado de validación
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
