/**
 * Component Entity - Domain Layer
 * Representa un componente UI con su lógica de negocio
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de la lógica del componente
 * - OCP: Extensible sin modificar código existente
 */

import { ComponentType } from '../enums/component-type.enum';
import type { ComponentProps } from '../value-objects/component-props.vo';

export class ComponentEntity {
  constructor(
    public readonly id: string,
    public readonly type: ComponentType,
    public readonly props: ComponentProps
  ) {
    this.validate();
  }

  /**
   * Valida que el componente sea válido
   */
  private validate(): void {
    if (!this.id || this.id.trim() === '') {
      throw new Error('Component ID cannot be empty');
    }

    if (!Object.values(ComponentType).includes(this.type)) {
      throw new Error(`Invalid component type: ${this.type}`);
    }

    if (!this.props) {
      throw new Error('Component props cannot be null or undefined');
    }
  }

  /**
   * Verifica si el componente es de un tipo específico
   */
  isOfType(type: ComponentType): boolean {
    return this.type === type;
  }

  /**
   * Verifica si el componente es un contenedor
   */
  isContainer(): boolean {
    return this.type === ComponentType.CONTAINER;
  }

  /**
   * Obtiene el valor de una propiedad específica
   */
  getProp<T = any>(key: string): T | undefined {
    return (this.props as any)[key];
  }
}
