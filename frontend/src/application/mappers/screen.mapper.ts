/**
 * Screen Mapper - Application Layer
 * Convierte entre entities del dominio y DTOs
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de mapeo
 */

import { ScreenEntity } from '../../domain/entities/screen.entity';
import { ComponentEntity } from '../../domain/entities/component.entity';
import { ScreenMetadata } from '../../domain/value-objects/screen-metadata.vo';
import { ComponentType } from '../../domain/enums/component-type.enum';
import type { ScreenDTO, ComponentDTO } from '../dtos/screen.dto';
import type { ComponentProps } from '../../domain/value-objects/component-props.vo';

export class ScreenMapper {
  /**
   * Convierte DTO a Entity
   */
  static toEntity(dto: ScreenDTO): ScreenEntity {
    const metadata = new ScreenMetadata(
      dto.metadata?.title || dto.name,
      dto.metadata?.description,
      undefined, // theme not in backend DTO
      undefined  // responsive not in backend DTO
    );

    const components = dto.components.map(compDto => 
      this.componentDtoToEntity(compDto)
    );

    return new ScreenEntity(dto.id, metadata, components);
  }

  /**
   * Convierte Entity a DTO
   */
  static toDTO(entity: ScreenEntity): ScreenDTO {
    return {
      id: entity.id,
      name: entity.metadata.title,
      metadata: {
        title: entity.metadata.title,
        description: entity.metadata.description
      },
      components: entity.components.map(comp => this.componentEntityToDto(comp)),
    };
  }

  /**
   * Convierte ComponentDTO a ComponentEntity
   */
  private static componentDtoToEntity(dto: ComponentDTO): ComponentEntity {
    return new ComponentEntity(
      dto.id,
      dto.type as ComponentType,
      dto.props as ComponentProps
    );
  }

  /**
   * Convierte ComponentEntity a ComponentDTO
   */
  private static componentEntityToDto(entity: ComponentEntity): ComponentDTO {
    return {
      id: entity.id,
      type: entity.type,
      props: entity.props as Record<string, any>,
    };
  }

  /**
   * Convierte múltiples entities a DTOs
   */
  static toDTOList(entities: ScreenEntity[]): ScreenDTO[] {
    return entities.map(entity => this.toDTO(entity));
  }

  /**
   * Convierte múltiples DTOs a entities
   */
  static toEntityList(dtos: ScreenDTO[]): ScreenEntity[] {
    return dtos.map(dto => this.toEntity(dto));
  }
}
