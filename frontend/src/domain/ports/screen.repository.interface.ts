/**
 * Screen Repository Interface - Domain Layer (Port)
 * Define el contrato para obtener pantallas
 * 
 * SOLID Principles:
 * - DIP: Dependencia de abstracción, no de implementación
 * - ISP: Interface segregada solo con métodos necesarios
 */

import type { ScreenEntity } from '../entities/screen.entity';

/**
 * Interfaz del repositorio de pantallas (Output Port)
 */
export interface IScreenRepository {
  /**
   * Obtiene una pantalla por su ID
   */
  getScreenById(screenId: string): Promise<ScreenEntity>;

  /**
   * Obtiene la pantalla home
   */
  getHomeScreen(): Promise<ScreenEntity>;

  /**
   * Obtiene todas las pantallas disponibles
   */
  getAllScreens(): Promise<ScreenEntity[]>;
}
