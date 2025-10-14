/**
 * Infrastructure Adapter: SDUIController
 * 
 * Controlador HTTP que adapta las peticiones web a casos de uso.
 * Principio SOLID: SRP - Solo responsable de manejar HTTP
 * Principio SOLID: DIP - Depende de la abstracción IScreenService
 */

import { Controller, Get, Param, Query } from '@nestjs/common';
import type { IScreenService } from '../../../application/ports/screen-service.interface';
import type { SDUIResponseDTO } from '../../../application/dtos/screen.dto';

@Controller('sdui')
export class SDUIController {
  constructor(private readonly screenService: IScreenService) {}

  @Get('screen/home')
  async getHomeScreen(): Promise<SDUIResponseDTO> {
    return this.screenService.getHomeScreen();
  }

  @Get('screen/dashboard')
  async getDashboardScreen(): Promise<SDUIResponseDTO> {
    return this.screenService.getDashboardScreen();
  }

  @Get('screen/:screenId')
  async getScreen(@Param('screenId') screenId: string): Promise<SDUIResponseDTO> {
    return this.screenService.getScreenById(screenId);
  }

  @Get('dynamic-form')
  async getDynamicForm(@Query('fields') fieldsQuery: string): Promise<SDUIResponseDTO> {
    const fields = fieldsQuery.split(',').map((field) => {
      const [id, type] = field.split(':');
      return {
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
        type,
      };
    });

    return this.screenService.createDynamicForm(fields);
  }
}
