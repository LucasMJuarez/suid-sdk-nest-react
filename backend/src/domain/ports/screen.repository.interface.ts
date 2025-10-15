/**
 * Port (Interface): ScreenRepository
 * 
 * Define el contrato para acceder a pantallas.
 * Principio SOLID: DIP - Dependencia de abstracciones, no de implementaciones
 * Principio SOLID: ISP - Interface segregation (solo métodos necesarios)
 */

import { ScreenEntity } from '../entities/screen.entity';
import { ScreenId } from '../value-objects/screen-id.vo';

export interface IScreenRepository {
  /**
   * Encuentra una pantalla por su ID
   */
  findById(id: ScreenId): Promise<ScreenEntity | null>;

  /**
   * Guarda una pantalla
   */
  save(screen: ScreenEntity): Promise<void>;

  /**
   * Obtiene todas las pantallas
   */
  findAll(): Promise<ScreenEntity[]>;

  /**
   * Elimina una pantalla
   */
  delete(id: ScreenId): Promise<void>;

  /**
   * Verifica si una pantalla existe
   */
  exists(id: ScreenId): Promise<boolean>;
}
