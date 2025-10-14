/**
 * Value Object: ScreenId
 * 
 * Representa un identificador único de pantalla.
 * Principio SOLID: SRP - Solo responsable de validar y encapsular el ID
 * Los Value Objects son inmutables
 */

export class ScreenId {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate(): void {
    if (!this._value || this._value.trim().length === 0) {
      throw new Error('ScreenId cannot be empty');
    }

    if (this._value.length > 50) {
      throw new Error('ScreenId cannot exceed 50 characters');
    }

    // Validar formato (solo letras, números, guiones)
    if (!/^[a-zA-Z0-9-_]+$/.test(this._value)) {
      throw new Error('ScreenId must contain only letters, numbers, hyphens, and underscores');
    }
  }

  static create(value: string): ScreenId {
    return new ScreenId(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: ScreenId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
