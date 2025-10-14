/**
 * Screen Application Service - Application Layer
 * Orquesta los casos de uso y coordina la lógica de aplicación
 * 
 * SOLID Principles:
 * - SRP: Coordina casos de uso
 * - DIP: Depende de abstracciones
 * - OCP: Extensible agregando nuevos casos de uso
 */

import type { IScreenService } from '../ports/screen-service.interface';
import type { IScreenRepository } from '../../domain/ports/screen.repository.interface';
import type { ScreenDTO } from '../dtos/screen.dto';
import { GetScreenByIdUseCase } from '../use-cases/get-screen-by-id.use-case';
import { GetHomeScreenUseCase } from '../use-cases/get-home-screen.use-case';
import { GetAllScreensUseCase } from '../use-cases/get-all-screens.use-case';

export class ScreenApplicationService implements IScreenService {
  private readonly getScreenByIdUseCase: GetScreenByIdUseCase;
  private readonly getHomeScreenUseCase: GetHomeScreenUseCase;
  private readonly getAllScreensUseCase: GetAllScreensUseCase;

  constructor(screenRepository: IScreenRepository) {
    // Inicializar casos de uso
    this.getScreenByIdUseCase = new GetScreenByIdUseCase(screenRepository);
    this.getHomeScreenUseCase = new GetHomeScreenUseCase(screenRepository);
    this.getAllScreensUseCase = new GetAllScreensUseCase(screenRepository);
  }

  /**
   * Obtiene una pantalla por ID
   */
  async getScreenById(screenId: string): Promise<ScreenDTO> {
    return this.getScreenByIdUseCase.execute(screenId);
  }

  /**
   * Obtiene la pantalla home
   */
  async getHomeScreen(): Promise<ScreenDTO> {
    return this.getHomeScreenUseCase.execute();
  }

  /**
   * Obtiene la pantalla dashboard (alias para home por ahora)
   */
  async getDashboardScreen(): Promise<ScreenDTO> {
    return this.getScreenById('dashboard');
  }

  /**
   * Obtiene todas las pantallas
   */
  async getAllScreens(): Promise<ScreenDTO[]> {
    return this.getAllScreensUseCase.execute();
  }
}
