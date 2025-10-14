/**
 * Domain Service: ScreenBuilder
 * 
 * Servicio del dominio para construir pantallas con validaciones de negocio.
 * Principio SOLID: SRP - Solo responsable de construir pantallas
 * Implementa el patrón Builder a nivel de dominio
 */

import { ComponentEntity } from '../entities/component.entity';
import { ScreenEntity } from '../entities/screen.entity';
import { ScreenId } from '../value-objects/screen-id.vo';
import { ScreenMetadata } from '../value-objects/screen-metadata.vo';
import { ComponentType } from '../enums/component-type.enum';
import { ComponentProps } from '../value-objects/component-props.vo';

export class ScreenBuilderService {
  private components: ComponentEntity[] = [];
  private metadata?: ScreenMetadata;

  constructor(
    private readonly screenId: ScreenId,
    private readonly screenName: string,
  ) {}

  withMetadata(title: string, description?: string): this {
    this.metadata = ScreenMetadata.create(title, description);
    return this;
  }

  addComponent(
    id: string,
    type: ComponentType,
    props: Record<string, any>,
  ): this {
    const componentProps = ComponentProps.create(props);
    const component = ComponentEntity.create(id, type, componentProps);
    this.components.push(component);
    return this;
  }

  addButton(id: string, props: Record<string, any>): this {
    return this.addComponent(id, ComponentType.BUTTON, props);
  }

  addInput(id: string, props: Record<string, any>): this {
    return this.addComponent(id, ComponentType.INPUT, props);
  }

  addAlert(id: string, props: Record<string, any>): this {
    return this.addComponent(id, ComponentType.ALERT, props);
  }

  addContainer(id: string, props: Record<string, any>): this {
    return this.addComponent(id, ComponentType.CONTAINER, props);
  }

  build(): ScreenEntity {
    return ScreenEntity.create(
      this.screenId,
      this.screenName,
      this.components,
      this.metadata,
    );
  }

  // Factory method
  static create(screenId: string, screenName: string): ScreenBuilderService {
    return new ScreenBuilderService(ScreenId.create(screenId), screenName);
  }
}
