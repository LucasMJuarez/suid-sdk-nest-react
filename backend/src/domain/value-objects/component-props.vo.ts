/**
 * Value Object: ComponentProps
 * 
 * Representa las propiedades de un componente UI.
 * Principio SOLID: SRP - Solo responsable de las propiedades del componente
 */

export class ComponentProps {
  private constructor(private readonly _properties: Record<string, any>) {
    this.validate();
  }

  private validate(): void {
    if (!this._properties) {
      throw new Error('Component properties cannot be null or undefined');
    }
  }

  static create(properties: Record<string, any> = {}): ComponentProps {
    return new ComponentProps({ ...properties });
  }

  get properties(): Record<string, any> {
    return { ...this._properties };
  }

  getProperty(key: string): any {
    return this._properties[key];
  }

  hasProperty(key: string): boolean {
    return key in this._properties;
  }

  // Value object equality
  equals(other: ComponentProps): boolean {
    if (!(other instanceof ComponentProps)) {
      return false;
    }

    const thisKeys = Object.keys(this._properties);
    const otherKeys = Object.keys(other._properties);

    if (thisKeys.length !== otherKeys.length) {
      return false;
    }

    return thisKeys.every(key => 
      this._properties[key] === other._properties[key]
    );
  }

  toJSON(): Record<string, any> {
    return { ...this._properties };
  }
}
