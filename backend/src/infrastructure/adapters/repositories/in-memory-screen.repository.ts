/**
 * Infrastructure Adapter: InMemoryScreenRepository
 * 
 * Implementación en memoria del repositorio de pantallas.
 * Principio SOLID: DIP - Implementa la interface del dominio
 * Principio SOLID: SRP - Solo responsable de persistencia
 * Principio SOLID: OCP - Podemos crear otras implementaciones (SQL, NoSQL)
 */

import { Injectable } from '@nestjs/common';
import type { IScreenRepository } from '../../../domain/ports/screen.repository.interface';
import { ScreenEntity } from '../../../domain/entities/screen.entity';
import type { ScreenId } from '../../../domain/value-objects/screen-id.vo';

@Injectable()
export class InMemoryScreenRepository implements IScreenRepository {
  private screens: Map<string, ScreenEntity> = new Map();

  async findById(id: ScreenId): Promise<ScreenEntity | null> {
    return this.screens.get(id.value) || null;
  }

  async save(screen: ScreenEntity): Promise<void> {
    this.screens.set(screen.id.value, screen);
  }

  async findAll(): Promise<ScreenEntity[]> {
    return Array.from(this.screens.values());
  }

  async delete(id: ScreenId): Promise<void> {
    this.screens.delete(id.value);
  }

  async exists(id: ScreenId): Promise<boolean> {
    return this.screens.has(id.value);
  }
}
