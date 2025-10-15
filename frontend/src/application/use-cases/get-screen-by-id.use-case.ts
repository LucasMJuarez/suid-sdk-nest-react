/**
 * Get Screen By ID Use Case - Application Layer
 * Caso de uso para obtener una pantalla por ID
 * 
 * SOLID Principles:
 * - SRP: Una sola responsabilidad - obtener pantalla por ID
 * - DIP: Depende de abstracciones (IScreenRepository)
 */

import type { IScreenRepository } from '../../domain/ports/screen.repository.interface';
import type { ScreenDTO } from '../dtos/screen.dto';
import { ScreenMapper } from '../mappers/screen.mapper';
import { ScreenValidatorService } from '../../domain/services/screen-validator.service';

export class GetScreenByIdUseCase {
  constructor(
    private readonly screenRepository: IScreenRepository,
    private readonly validator: ScreenValidatorService = new ScreenValidatorService()
  ) {}

  /**
   * Ejecuta el caso de uso
   */
  async execute(screenId: string): Promise<ScreenDTO> {
    // Validar entrada
    if (!screenId || screenId.trim() === '') {
      throw new Error('Screen ID cannot be empty');
    }

    try {
      // Obtener la pantalla del repositorio (domain entity)
      const screenEntity = await this.screenRepository.getScreenById(screenId);

      // Validar la pantalla
      const validationResult = this.validator.validateScreen(screenEntity);
      if (!validationResult.isValid) {
        throw new Error(`Invalid screen: ${validationResult.errors.join(', ')}`);
      }

      // Convertir a DTO y retornar
      return ScreenMapper.toDTO(screenEntity);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get screen ${screenId}: ${error.message}`);
      }
      throw new Error(`Failed to get screen ${screenId}: Unknown error`);
    }
  }
}
