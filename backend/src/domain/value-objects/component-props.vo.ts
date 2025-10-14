/**
 * Value Object: ComponentProps
 * 
 * Encapsula las propiedades de un componente.
 * Principio SOLID: SRP - Solo responsable de validar y encapsular props
 */

export class ComponentProps {
  private constructor(private readonly _props: Record<string, any>) {
    this.validate();
  }

  private validate(): void {
    if (!this._props) {
      throw new Error('Component props cannot be null or undefined');
    }
  }

  static create(props: Record<string, any>): ComponentProps {
    return new ComponentProps(props);
  }

  get(key: string): any {
    return this._props[key];
  }

  has(key: string): boolean {
    return key in this._props;
  }

  toJSON(): Record<string, any> {
    return { ...this._props };
  }
}
