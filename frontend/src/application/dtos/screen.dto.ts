/**
 * Screen DTO - Application Layer
 * Data Transfer Object para transportar datos de pantalla
 * Debe coincidir con el backend DTO
 */

export interface ComponentDTO {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface ScreenMetadataDTO {
  title?: string;
  description?: string;
}

export interface ScreenDTO {
  id: string;
  name: string;
  components: ComponentDTO[];
  metadata?: ScreenMetadataDTO;
}
