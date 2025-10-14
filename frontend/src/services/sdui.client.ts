import type { SDUIResponse } from '../types/sdui.types';

const API_BASE_URL = 'http://localhost:3000';

/**
 * SDUI Client - Fetches UI configuration from backend
 */
export class SDUIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch a screen configuration by ID
   */
  async getScreen(screenId: string): Promise<SDUIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/sdui/screen/${screenId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch screen: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching screen:', error);
      throw error;
    }
  }

  /**
   * Fetch the home screen
   */
  async getHomeScreen(): Promise<SDUIResponse> {
    return this.getScreen('home');
  }

  /**
   * Fetch the dashboard screen
   */
  async getDashboardScreen(): Promise<SDUIResponse> {
    return this.getScreen('dashboard');
  }

  /**
   * Fetch a dynamic form
   */
  async getDynamicForm(fields: string[]): Promise<SDUIResponse> {
    try {
      const fieldsQuery = fields.join(',');
      const response = await fetch(
        `${this.baseUrl}/sdui/dynamic-form?fields=${fieldsQuery}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch dynamic form: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching dynamic form:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const sduiClient = new SDUIClient();
