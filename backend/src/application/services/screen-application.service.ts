/**
 * Application Service: ScreenApplicationService
 * 
 * Orquesta los casos de uso y coordina la lógica de aplicación.
 * Principio SOLID: SRP - Coordinar casos de uso
 * Principio SOLID: OCP - Abierto para extensión (nuevos use cases)
 * Principio SOLID: DIP - Depende de abstracciones
 */

import { Injectable } from '@nestjs/common';
import type { IScreenService } from '../ports/screen-service.interface';
import { ScreenDTO, SDUIResponseDTO } from '../dtos/screen.dto';
import { ScreenBuilderService } from '../../domain/services/screen-builder.service';
import { ScreenMapper } from '../mappers/screen.mapper';

@Injectable()
export class ScreenApplicationService implements IScreenService {
  async getScreenById(screenId: string): Promise<SDUIResponseDTO> {
    let screenDTO: ScreenDTO;

    switch (screenId) {
      case 'home':
        screenDTO = await this.getHomeScreenData();
        break;
      case 'dashboard':
        screenDTO = await this.getDashboardScreenData();
        break;
      default:
        screenDTO = await this.getHomeScreenData();
    }

    return {
      screen: screenDTO,
      timestamp: Date.now(),
    };
  }

  async getHomeScreen(): Promise<SDUIResponseDTO> {
    return this.getScreenById('home');
  }

  async getDashboardScreen(): Promise<SDUIResponseDTO> {
    return this.getScreenById('dashboard');
  }

  async createDynamicForm(
    fields: Array<{ id: string; label: string; type: string }>,
  ): Promise<SDUIResponseDTO> {
    const builder = ScreenBuilderService.create(
      'dynamic-form',
      'Dynamic Form',
    ).withMetadata('Dynamic Form', 'Generated dynamically from backend');

    // Agregar inputs dinámicamente
    fields.forEach((field) => {
      builder.addInput(field.id, {
        label: field.label,
        type: field.type,
        placeholder: `Enter ${field.label}`,
        required: true,
        fullWidth: true,
      });
    });

    // Agregar botón de submit
    builder.addButton('submit', {
      label: 'Submit',
      variant: 'primary',
      size: 'large',
      fullWidth: true,
    });

    const screenEntity = builder.build();
    const screenDTO = ScreenMapper.toDTO(screenEntity);

    return {
      screen: screenDTO,
      timestamp: Date.now(),
    };
  }

  // Métodos privados para construir pantallas específicas
  private async getHomeScreenData(): Promise<ScreenDTO> {
    const builder = ScreenBuilderService.create('home', 'Home Screen')
      .withMetadata('Welcome to SDUI', 'Server-Driven UI Demo Application')
      .addAlert('welcome-alert', {
        message:
          'This entire UI is controlled by the backend! Change the props in the backend to see the changes reflected here.',
        type: 'info',
        title: '🚀 SDUI Demo',
        dismissible: true,
        icon: true,
      })
      .addInput('name-input', {
        placeholder: 'Enter your name',
        type: 'text',
        label: 'Full Name',
        required: true,
        fullWidth: true,
      })
      .addInput('email-input', {
        placeholder: 'Enter your email',
        type: 'email',
        label: 'Email Address',
        required: true,
        fullWidth: true,
      })
      .addButton('submit-btn', {
        label: 'Submit Form',
        variant: 'primary',
        size: 'large',
        fullWidth: true,
      })
      .addAlert('success-alert', {
        message:
          'You can change button variants: primary, secondary, success, danger, warning',
        type: 'success',
        dismissible: false,
        icon: true,
      });

    const screenEntity = builder.build();
    return ScreenMapper.toDTO(screenEntity);
  }

  private async getDashboardScreenData(): Promise<ScreenDTO> {
    const builder = ScreenBuilderService.create('dashboard', 'Dashboard')
      .withMetadata('Dashboard', 'Your personalized dashboard')
      .addAlert('info-alert', {
        message: 'Dashboard metrics and information',
        type: 'info',
        title: 'Dashboard Overview',
        dismissible: true,
        icon: true,
      })
      .addButton('btn-1', {
        label: 'Action 1',
        variant: 'primary',
        size: 'medium',
      })
      .addButton('btn-2', {
        label: 'Action 2',
        variant: 'secondary',
        size: 'medium',
      })
      .addButton('btn-3', {
        label: 'Action 3',
        variant: 'success',
        size: 'medium',
      });

    const screenEntity = builder.build();
    return ScreenMapper.toDTO(screenEntity);
  }
}
