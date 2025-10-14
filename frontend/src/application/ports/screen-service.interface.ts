/**
 * Screen Service Interface - Application Layer (Port)
 * Define el contrato para el servicio de pantallas
 * 
 * SOLID Principles:
 * - DIP: Dependency Inversion Principle
 * - ISP: Interface Segregation Principle
 */

import type { ScreenDTO } from '../dtos/screen.dto';

/**
 * Interfaz del servicio de pantallas (Input Port)
 */
export interface IScreenService {
  /**
   * Obtiene una pantalla por su ID
   */
  getScreenById(screenId: string): Promise<ScreenDTO>;

  /**
   * Obtiene la pantalla home
   */
  getHomeScreen(): Promise<ScreenDTO>;

  /**
   * Obtiene la pantalla dashboard
   */
  getDashboardScreen(): Promise<ScreenDTO>;

  /**
   * Obtiene todas las pantallas disponibles
   */
  getAllScreens(): Promise<ScreenDTO[]>;
}
