/**
 * Use Case: GetScreenByIdUseCase
 * 
 * Caso de uso para obtener una pantalla por ID.
 * Principio SOLID: SRP - Una sola responsabilidad: obtener pantalla
 * Principio SOLID: DIP - Depende de abstracciones (IScreenRepository)
 */

import { Injectable } from '@nestjs/common';
import * as screenRepositoryInterface from '../../domain/ports/screen.repository.interface';
import { ScreenId } from '../../domain/value-objects/screen-id.vo';
import { ScreenDTO } from '../dtos/screen.dto';
import { ScreenMapper } from '../mappers/screen.mapper';

@Injectable()
export class GetScreenByIdUseCase {
  constructor(private readonly screenRepository: screenRepositoryInterface.IScreenRepository) {}

  async execute(screenId: string): Promise<ScreenDTO | null> {
    const id = ScreenId.create(screenId);
    const screenEntity = await this.screenRepository.findById(id);

    if (!screenEntity) {
      return null;
    }

    return ScreenMapper.toDTO(screenEntity);
  }
}
