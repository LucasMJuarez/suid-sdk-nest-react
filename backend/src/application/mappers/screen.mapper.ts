/**
 * Mapper: ScreenMapper
 * 
 * Transforma entidades de dominio a DTOs y viceversa.
 * Principio SOLID: SRP - Solo responsable de transformación de datos
 */

import { ScreenEntity } from '../../domain/entities/screen.entity';
import { ScreenDTO, ComponentDTO, ScreenMetadataDTO } from '../dtos/screen.dto';

export class ScreenMapper {
  static toDTO(entity: ScreenEntity): ScreenDTO {
    return {
      id: entity.id.value,
      name: entity.name,
      components: entity.components.map((c) => ({
        id: c.id,
        type: c.type,
        props: c.props.toJSON(),
      })),
      metadata: entity.metadata
        ? {
            title: entity.metadata.title,
            description: entity.metadata.description,
          }
        : undefined,
    };
  }
}
