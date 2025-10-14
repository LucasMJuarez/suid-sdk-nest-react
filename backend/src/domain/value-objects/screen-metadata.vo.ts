/**
 * Value Object: ScreenMetadata
 * 
 * Encapsula los metadatos de una pantalla.
 * Principio SOLID: SRP - Solo responsable de los metadatos
 */

export class ScreenMetadata {
  private constructor(
    private readonly _title: string,
    private readonly _description?: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._title || this._title.trim().length === 0) {
      throw new Error('Metadata title cannot be empty');
    }

    if (this._title.length > 100) {
      throw new Error('Metadata title cannot exceed 100 characters');
    }
  }

  static create(title: string, description?: string): ScreenMetadata {
    return new ScreenMetadata(title, description);
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  toJSON() {
    return {
      title: this._title,
      description: this._description,
    };
  }
}
