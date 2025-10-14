/**
 * Screen Entity - Domain Layer
 * Representa una pantalla completa con componentes
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de la lógica de la pantalla
 * - OCP: Extensible para agregar nuevas funcionalidades
 */

import type { ComponentEntity } from './component.entity';
import type { ScreenMetadata } from '../value-objects/screen-metadata.vo';

export class ScreenEntity {
  constructor(
    public readonly id: string,
    public readonly metadata: ScreenMetadata,
    private readonly _components: ComponentEntity[]
  ) {
    this.validate();
  }

  /**
   * Valida que la pantalla sea válida
   */
  private validate(): void {
    if (!this.id || this.id.trim() === '') {
      throw new Error('Screen ID cannot be empty');
    }

    if (!this.metadata) {
      throw new Error('Screen metadata cannot be null or undefined');
    }

    if (!Array.isArray(this._components)) {
      throw new Error('Components must be an array');
    }
  }

  /**
   * Obtiene los componentes de la pantalla (inmutable)
   */
  get components(): ReadonlyArray<ComponentEntity> {
    return Object.freeze([...this._components]);
  }

  /**
   * Cuenta el número total de componentes
   */
  getComponentCount(): number {
    return this._components.length;
  }

  /**
   * Busca un componente por su ID
   */
  findComponentById(componentId: string): ComponentEntity | undefined {
    return this._components.find(comp => comp.id === componentId);
  }

  /**
   * Verifica si la pantalla tiene componentes
   */
  hasComponents(): boolean {
    return this._components.length > 0;
  }

  /**
   * Verifica si la pantalla está vacía
   */
  isEmpty(): boolean {
    return this._components.length === 0;
  }
}
