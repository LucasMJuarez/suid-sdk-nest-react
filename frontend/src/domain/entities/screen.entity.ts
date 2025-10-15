/**
 * Screen Entity - Domain Layer
 * Representa una pantalla completa con componentes
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de la lógica de la pantalla
 * - OCP: Extensible para agregar nuevas funcionalidades
 */

import { ScreenMetadata } from '../value-objects/screen-metadata.vo';
import type { ComponentEntity } from './component.entity';

export class ScreenEntity {
  constructor(
    public readonly id: string,
    public readonly metadata: ScreenMetadata,
    private readonly _components: ComponentEntity[]
  ) {
    this.validate();
  }


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
   * Verifica si la pantalla tiene componentes
   */
  hasComponents(): boolean {
    return this._components.length > 0;
  }

}
