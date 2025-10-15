/**
 * Application DTO: ScreenDTO
 * 
 * Data Transfer Object para transferir datos de pantallas.
 * Principio SOLID: SRP - Solo responsable de transportar datos
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

export interface SDUIResponseDTO {
  screen: ScreenDTO;
  timestamp: number;
}
