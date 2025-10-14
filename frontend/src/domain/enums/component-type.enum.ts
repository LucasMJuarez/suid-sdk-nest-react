/**
 * ComponentType Enum - Domain Layer
 * Define los tipos de componentes UI disponibles
 */

export enum ComponentType {
  BUTTON = 'button',
  INPUT = 'input',
  ALERT = 'alert',
  CONTAINER = 'container',
}

/**
 * Type guard para verificar si un string es un ComponentType válido
 */
export function isValidComponentType(type: string): type is ComponentType {
  return Object.values(ComponentType).includes(type as ComponentType);
}
