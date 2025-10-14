/**
 * HTTP Screen Repository - Infrastructure Layer
 * Implementación del repositorio usando HTTP/Fetch
 * 
 * SOLID Principles:
 * - DIP: Implementa interfaz del dominio
 * - SRP: Solo responsable de comunicación HTTP
 */

import type { IScreenRepository } from '../../../domain/ports/screen.repository.interface';
import { ScreenEntity } from '../../../domain/entities/screen.entity';
import { ScreenMapper } from '../../../application/mappers/screen.mapper';
import type { ScreenDTO } from '../../../application/dtos/screen.dto';

export class HttpScreenRepository implements IScreenRepository {
  constructor(
    private readonly baseUrl: string = 'http://localhost:3000'
  ) {}

  /**
   * Obtiene una pantalla por ID
   */
  async getScreenById(screenId: string): Promise<ScreenEntity> {
    try {
      const response = await fetch(`${this.baseUrl}/sdui/screen/${screenId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dto: ScreenDTO = await response.json();
      return ScreenMapper.toEntity(dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch screen ${screenId}: ${error.message}`);
      }
      throw new Error(`Failed to fetch screen ${screenId}`);
    }
  }

  /**
   * Obtiene la pantalla home
   */
  async getHomeScreen(): Promise<ScreenEntity> {
    return this.getScreenById('home');
  }

  /**
   * Obtiene todas las pantallas disponibles
   */
  async getAllScreens(): Promise<ScreenEntity[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sdui/screens`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dtos: ScreenDTO[] = await response.json();
      return ScreenMapper.toEntityList(dtos);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch all screens: ${error.message}`);
      }
      throw new Error('Failed to fetch all screens');
    }
  }
}
