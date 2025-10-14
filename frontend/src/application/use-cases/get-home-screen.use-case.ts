/**
 * Get Home Screen Use Case - Application Layer
 * Caso de uso específico para obtener la pantalla home
 * 
 * SOLID Principles:
 * - SRP: Una sola responsabilidad - obtener pantalla home
 */

import type { IScreenRepository } from '../../domain/ports/screen.repository.interface';
import type { ScreenDTO } from '../dtos/screen.dto';
import { ScreenMapper } from '../mappers/screen.mapper';

export class GetHomeScreenUseCase {
  constructor(
    private readonly screenRepository: IScreenRepository
  ) {}

  async execute(): Promise<ScreenDTO> {
    try {
      const screenEntity = await this.screenRepository.getHomeScreen();
      return ScreenMapper.toDTO(screenEntity);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get home screen: ${error.message}`);
      }
      throw new Error('Failed to get home screen: Unknown error');
    }
  }
}
