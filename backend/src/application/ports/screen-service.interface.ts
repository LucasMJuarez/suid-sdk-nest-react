/**
 * Application Port (Output): Screen Service
 * 
 * Interface que define los casos de uso para pantallas.
 * Principio SOLID: ISP - Interface específica para servicios de pantalla
 * Principio SOLID: DIP - Dependencia de abstracción
 */

import { ScreenDTO, SDUIResponseDTO } from '../dtos/screen.dto';

export interface IScreenService {
  /**
   * Obtiene una pantalla por su ID
   */
  getScreenById(screenId: string): Promise<SDUIResponseDTO>;

  /**
   * Obtiene la pantalla principal
   */
  getHomeScreen(): Promise<SDUIResponseDTO>;

  /**
   * Obtiene el dashboard
   */
  getDashboardScreen(): Promise<SDUIResponseDTO>;

  /**
   * Crea un formulario dinámico
   */
  createDynamicForm(fields: Array<{ id: string; label: string; type: string }>): Promise<SDUIResponseDTO>;
}
