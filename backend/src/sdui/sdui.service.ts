import { Injectable } from '@nestjs/common';
import { Screen } from './types/component.types';
import { createScreen } from './sdui.sdk';

@Injectable()
export class SduiService {
  /**
   * Get the home screen configuration
   */
  getHomeScreen(): Screen {
    return createScreen('home', 'Home Screen')
      .withMetadata('Welcome to SDUI', 'Server-Driven UI Demo Application')
      .addAlert('welcome-alert', {
        message: 'This entire UI is controlled by the backend! Change the props in the backend to see the changes reflected here.',
        type: 'info',
        title: '🚀 SDUI Demooooadadadadooo',
        dismissible: true,
        icon: false,
      })
      .addContainer('form-container', {
        layout: 'vertical',
        gap: 'medium',
        padding: 'medium',
        children: [
          {
            id: 'name-input',
            type: 'input' as any,
            props: {
              placeholder: 'Enter your name',
              type: 'text',
              label: 'Full Name',
              required: true,
              fullWidth: true,
            },
          },
          {
            id: 'email-input',
            type: 'input' as any,
            props: {
              placeholder: 'Enter your email',
              type: 'email',
              label: 'Email Address',
              required: true,
              fullWidth: true,
            },
          },
        ],
      })
      .addButton('submit-btn', {
        label: 'Submit Form',
        variant: 'primary',
        size: 'large',
        fullWidth: true,
      })
      .addAlert('success-alert', {
        message: 'You can change button variants: primary, secondary, success, danger, warning',
        type: 'success',
        dismissible: false,
        icon: true,
      })
      .build();
  }

  /**
   * Get the dashboard screen configuration
   */
  getDashboardScreen(): Screen {
    return createScreen('dashboard', 'Dashboard')
      .withMetadata('Dashboard', 'Your personalized dashboard')
      .addAlert('info-alert', {
        message: 'Dashboard metrics and information',
        type: 'info',
        title: 'Dashboard Overview',
        dismissible: true,
        icon: true,
      })
      .addContainer('actions-container', {
        layout: 'horizontal',
        gap: 'small',
        padding: 'small',
        children: [
          {
            id: 'btn-1',
            type: 'button' as any,
            props: {
              label: 'Action 1',
              variant: 'primary',
              size: 'medium',
            },
          },
          {
            id: 'btn-2',
            type: 'button' as any,
            props: {
              label: 'Action 2',
              variant: 'secondary',
              size: 'medium',
            },
          },
          {
            id: 'btn-3',
            type: 'button' as any,
            props: {
              label: 'Action 3',
              variant: 'success',
              size: 'medium',
            },
          },
        ],
      })
      .build();
  }

  /**
   * Get a custom screen based on screenId
   */
  getScreen(screenId: string): Screen {
    switch (screenId) {
      case 'home':
        return this.getHomeScreen();
      case 'dashboard':
        return this.getDashboardScreen();
      default:
        return this.getHomeScreen();
    }
  }

  /**
   * Example: Dynamic screen generation based on parameters
   */
  createDynamicForm(fields: Array<{ id: string; label: string; type: string }>): Screen {
    const builder = createScreen('dynamic-form', 'Dynamic Form')
      .withMetadata('Dynamic Form', 'Generated dynamically from backend');

    // Add input fields
    fields.forEach((field) => {
      builder.addInput(field.id, {
        label: field.label,
        type: field.type as any,
        placeholder: `Enter ${field.label}`,
        required: true,
        fullWidth: true,
      });
    });

    // Add submit button
    builder.addButton('submit', {
      label: 'Submit',
      variant: 'primary',
      size: 'large',
      fullWidth: true,
    });

    return builder.build();
  }
}
