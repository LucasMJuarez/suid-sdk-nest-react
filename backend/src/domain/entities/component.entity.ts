/**
 * Domain Entity: Component
 * 
 * Representa un componente UI en el dominio.
 * Principio SOLID: SRP - Solo responsable de la lógica del componente
 */

import { ComponentType } from '../enums/component-type.enum';
import { ComponentProps } from '../value-objects/component-props.vo';

export class ComponentEntity {
  private constructor(
    private readonly _id: string,
    private readonly _type: ComponentType,
    private readonly _props: ComponentProps,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._id || this._id.trim().length === 0) {
      throw new Error('Component id cannot be empty');
    }

    if (!this._type) {
      throw new Error('Component type is required');
    }
  }

  static create(
    id: string,
    type: ComponentType,
    props: ComponentProps,
  ): ComponentEntity {
    return new ComponentEntity(id, type, props);
  }

  get id(): string {
    return this._id;
  }

  get type(): ComponentType {
    return this._type;
  }

  get props(): ComponentProps {
    return this._props;
  }

  // Domain Logic
  isButton(): boolean {
    return this._type === ComponentType.BUTTON;
  }

  isInput(): boolean {
    return this._type === ComponentType.INPUT;
  }

  isAlert(): boolean {
    return this._type === ComponentType.ALERT;
  }

  isContainer(): boolean {
    return this._type === ComponentType.CONTAINER;
  }

  toJSON() {
    return {
      id: this._id,
      type: this._type,
      props: this._props.toJSON(),
    };
  }
}
