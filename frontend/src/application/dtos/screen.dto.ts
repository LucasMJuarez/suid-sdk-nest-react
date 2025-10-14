/**
 * Screen DTO - Application Layer
 * Data Transfer Object para transportar datos de pantalla
 */

export interface ScreenDTO {
  id: string;
  title: string;
  description?: string;
  theme?: 'light' | 'dark';
  responsive?: boolean;
  components: ComponentDTO[];
}

export interface ComponentDTO {
  id: string;
  type: string;
  props: Record<string, any>;
}
