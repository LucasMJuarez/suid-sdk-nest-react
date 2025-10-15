/**
 * Domain Entity: Screen
 * 
 * Representa una pantalla en el sistema SDUI.
 * Es una entidad del dominio que contiene la lógica de negocio.
 * Principio SOLID: SRP - Solo responsable de la lógica de pantalla
 */

import { ScreenId } from '../value-objects/screen-id.vo';
import { ScreenMetadata } from '../value-objects/screen-metadata.vo';
import { ComponentEntity } from './component.entity';

export class ScreenEntity {
  private constructor(
    private readonly _id: ScreenId,
    private readonly _name: string,
    private readonly _components: ComponentEntity[],
    private readonly _metadata?: ScreenMetadata,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Screen name cannot be empty');
    }
    
    if (this._components.length === 0) {
      throw new Error('Screen must have at least one component');
    }
  }

  static create(
    id: ScreenId,
    name: string,
    components: ComponentEntity[],
    metadata?: ScreenMetadata,
  ): ScreenEntity {
    return new ScreenEntity(id, name, components, metadata);
  }

  // Getters (Value Objects son inmutables)
  get id(): ScreenId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get components(): ReadonlyArray<ComponentEntity> {
    return this._components;
  }

  get metadata(): ScreenMetadata | undefined {
    return this._metadata;
  }

  // Domain Logic
  hasComponent(componentId: string): boolean {
    return this._components.some((c) => c.id === componentId);
  }

  getComponentById(componentId: string): ComponentEntity | undefined {
    return this._components.find((c) => c.id === componentId);
  }

  getComponentsCount(): number {
    return this._components.length;
  }

  // Convertir a primitivos para persistencia
  toJSON() {
    return {
      id: this._id.value,
      name: this._name,
      components: this._components.map((c) => c.toJSON()),
      metadata: this._metadata?.toJSON(),
    };
  }
}
