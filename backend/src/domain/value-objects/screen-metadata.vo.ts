/**
 * Value Object: Screen Metadata
 * 
 * Representa los metadatos de una pantalla en el sistema SDUI.
 * Value Object inmutable que encapsula información adicional de la pantalla.
 * Principio SOLID: SRP - Solo responsable de los metadatos de pantalla
 */

export interface ScreenMetadataProps {
  title?: string;
  description?: string;
  version?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class ScreenMetadata {
  private constructor(
    private readonly _title?: string,
    private readonly _description?: string,
    private readonly _version?: string,
    private readonly _tags?: ReadonlyArray<string>,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this._version && this._version.trim().length === 0) {
      throw new Error('Version cannot be empty string');
    }
    
    if (this._tags && this._tags.some(tag => !tag || tag.trim().length === 0)) {
      throw new Error('Tags cannot contain empty values');
    }
  }

  static create(props: ScreenMetadataProps): ScreenMetadata {
    return new ScreenMetadata(
      props.title,
      props.description,
      props.version,
      props.tags ? [...props.tags] : undefined,
      props.createdAt,
      props.updatedAt,
    );
  }

  static empty(): ScreenMetadata {
    return new ScreenMetadata();
  }

  // Getters
  get title(): string | undefined {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get version(): string | undefined {
    return this._version;
  }

  get tags(): ReadonlyArray<string> | undefined {
    return this._tags;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  // Domain Logic
  hasTag(tag: string): boolean {
    return this._tags?.includes(tag) ?? false;
  }

  isEmpty(): boolean {
    return !this._title && !this._description && !this._version && 
           (!this._tags || this._tags.length === 0);
  }

  // Convertir a primitivos para persistencia
  toJSON() {
    return {
      title: this._title,
      description: this._description,
      version: this._version,
      tags: this._tags ? [...this._tags] : undefined,
      createdAt: this._createdAt?.toISOString(),
      updatedAt: this._updatedAt?.toISOString(),
    };
  }

  // Value Object equality
  equals(other: ScreenMetadata): boolean {
    return (
      this._title === other._title &&
      this._description === other._description &&
      this._version === other._version &&
      JSON.stringify(this._tags) === JSON.stringify(other._tags) &&
      this._createdAt?.getTime() === other._createdAt?.getTime() &&
      this._updatedAt?.getTime() === other._updatedAt?.getTime()
    );
  }
}
