/**
 * Dependency Injection Container - Infrastructure Layer
 * Configura e inyecta dependencias
 * 
 * SOLID Principles:
 * - DIP: Dependency Inversion Principle
 * - SRP: Single Responsibility - solo configuración de DI
 */

import type { IScreenRepository } from '../../domain/ports/screen.repository.interface';
import type { IScreenService } from '../../application/ports/screen-service.interface';
import { HttpScreenRepository } from '../adapters/repositories/http-screen.repository';
import { ScreenApplicationService } from '../../application/services/screen-application.service';

/**
 * Configuración del contenedor de DI
 */
class DIContainer {
  private static instance: DIContainer;
  private _screenRepository?: IScreenRepository;
  private _screenService?: IScreenService;

  private constructor() {}

  /**
   * Singleton instance
   */
  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  /**
   * Configura el repositorio de pantallas
   */
  setScreenRepository(repository: IScreenRepository): void {
    this._screenRepository = repository;
  }

  /**
   * Obtiene el repositorio de pantallas
   */
  getScreenRepository(): IScreenRepository {
    if (!this._screenRepository) {
      // Configuración por defecto
      this._screenRepository = new HttpScreenRepository();
    }
    return this._screenRepository;
  }

  /**
   * Obtiene el servicio de pantallas
   */
  getScreenService(): IScreenService {
    if (!this._screenService) {
      const repository = this.getScreenRepository();
      this._screenService = new ScreenApplicationService(repository);
    }
    return this._screenService;
  }

  /**
   * Resetea el contenedor (útil para testing)
   */
  reset(): void {
    this._screenRepository = undefined;
    this._screenService = undefined;
  }
}

// Exportar instancia singleton
export const container = DIContainer.getInstance();

/**
 * Hook de conveniencia para obtener el servicio de pantallas
 */
export function getScreenService(): IScreenService {
  return container.getScreenService();
}
