import { Controller, Get, Param, Query } from '@nestjs/common';
import { SduiService } from './sdui.service';
import type { Screen, SDUIResponse } from './types/component.types';

@Controller('sdui')
export class SduiController {
  constructor(private readonly sduiService: SduiService) {}

  /**
   * Get the home screen
   */
  @Get('screen/home')
  getHomeScreen(): SDUIResponse {
    return {
      screen: this.sduiService.getHomeScreen(),
      timestamp: Date.now(),
    };
  }

  /**
   * Get the dashboard screen
   */
  @Get('screen/dashboard')
  getDashboardScreen(): SDUIResponse {
    return {
      screen: this.sduiService.getDashboardScreen(),
      timestamp: Date.now(),
    };
  }

  /**
   * Get any screen by ID
   */
  @Get('screen/:screenId')
  getScreen(@Param('screenId') screenId: string): SDUIResponse {
    return {
      screen: this.sduiService.getScreen(screenId),
      timestamp: Date.now(),
    };
  }

  /**
   * Example: Dynamic form generation
   * Usage: /sdui/dynamic-form?fields=name:text,email:email,phone:tel
   */
  @Get('dynamic-form')
  getDynamicForm(@Query('fields') fieldsQuery: string): SDUIResponse {
    const fields = fieldsQuery.split(',').map((field) => {
      const [id, type] = field.split(':');
      return {
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
        type,
      };
    });

    return {
      screen: this.sduiService.createDynamicForm(fields),
      timestamp: Date.now(),
    };
  }
}
