/**
 * Infrastructure Module: SDUIModule
 * 
 * Módulo de infraestructura que conecta todas las capas.
 * Configuración de Dependency Injection siguiendo principio DIP.
 */

import { Module } from '@nestjs/common';
import { SDUIController } from './adapters/http/sdui.controller';
import { ScreenApplicationService } from '../application/services/screen-application.service';
import { InMemoryScreenRepository } from './adapters/repositories/in-memory-screen.repository';
import { IScreenRepository } from '../domain/ports/screen.repository.interface';
import { IScreenService } from '../application/ports/screen-service.interface';

@Module({
  controllers: [
    SDUIController, // Adapter HTTP
  ],
  providers: [
    // Application Services
    {
      provide: 'IScreenService',
      useClass: ScreenApplicationService,
    },
    // Domain Repositories
    {
      provide: 'IScreenRepository',
      useClass: InMemoryScreenRepository,
    },
    // Export para inyección
    ScreenApplicationService,
    InMemoryScreenRepository,
  ],
  exports: [
    'IScreenService',
    'IScreenRepository',
  ],
})
export class SDUIModule {}
