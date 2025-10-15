/**
 * Screen Metadata Value Object - Domain Layer
 * Representa los metadatos de una pantalla
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de los metadatos de la pantalla
 * - Immutability: Value Object inmutable
 */

export class ScreenMetadata {
  constructor(
    public readonly title: string,
    public readonly description?: string,
    public readonly theme?: 'light' | 'dark',
    public readonly responsive?: boolean
  ) {
    this.validate();
  }

  /**
   * Valida los metadatos
   */
  private validate(): void {
    if (!this.title || this.title.trim() === '') {
      throw new Error('Screen title cannot be empty');
    }

    if (this.theme && !['light', 'dark'].includes(this.theme)) {
      throw new Error(`Invalid theme: ${this.theme}`);
    }
  }

  /**
   * Crea una copia con valores actualizados
   */
  update(updates: Partial<ScreenMetadata>): ScreenMetadata {
    return new ScreenMetadata(
      updates.title ?? this.title,
      updates.description ?? this.description,
      updates.theme ?? this.theme,
      updates.responsive ?? this.responsive
    );
  }

  /**
   * Verifica si es responsive
   */
  isResponsive(): boolean {
    return this.responsive === true;
  }

  /**
   * Verifica si tiene un tema específico
   */
  hasTheme(theme: 'light' | 'dark'): boolean {
    return this.theme === theme;
  }
}
