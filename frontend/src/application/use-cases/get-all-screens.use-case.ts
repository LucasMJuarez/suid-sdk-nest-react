/**
 * Get All Screens Use Case - Application Layer
 * Caso de uso para obtener todas las pantallas
 */

import type { IScreenRepository } from '../../domain/ports/screen.repository.interface';
import type { ScreenDTO } from '../dtos/screen.dto';
import { ScreenMapper } from '../mappers/screen.mapper';

export class GetAllScreensUseCase {
  constructor(
    private readonly screenRepository: IScreenRepository
  ) {}

  async execute(): Promise<ScreenDTO[]> {
    try {
      const screenEntities = await this.screenRepository.getAllScreens();
      return ScreenMapper.toDTOList(screenEntities);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get all screens: ${error.message}`);
      }
      throw new Error('Failed to get all screens: Unknown error');
    }
  }
}
