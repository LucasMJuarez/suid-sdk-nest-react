import { ComponentType, Screen, UIComponent, ButtonProps, InputProps, AlertProps, ContainerProps } from './types/component.types';

/**
 * SDUI SDK - Builder Pattern
 * This SDK allows you to create UI components programmatically from the backend
 */

export class SDUIBuilder {
  private components: UIComponent[] = [];
  private screenId: string;
  private screenName: string;
  private metadata?: { title?: string; description?: string };

  constructor(screenId: string, screenName: string) {
    this.screenId = screenId;
    this.screenName = screenName;
  }

  /**
   * Add metadata to the screen
   */
  withMetadata(title?: string, description?: string): this {
    this.metadata = { title, description };
    return this;
  }

  /**
   * Add a button component
   */
  addButton(id: string, props: ButtonProps): this {
    this.components.push({
      id,
      type: ComponentType.BUTTON,
      props,
    });
    return this;
  }

  /**
   * Add an input component
   */
  addInput(id: string, props: InputProps): this {
    this.components.push({
      id,
      type: ComponentType.INPUT,
      props,
    });
    return this;
  }

  /**
   * Add an alert component
   */
  addAlert(id: string, props: AlertProps): this {
    this.components.push({
      id,
      type: ComponentType.ALERT,
      props,
    });
    return this;
  }

  /**
   * Add a container component
   */
  addContainer(id: string, props: ContainerProps): this {
    this.components.push({
      id,
      type: ComponentType.CONTAINER,
      props,
    });
    return this;
  }

  /**
   * Build the final screen configuration
   */
  build(): Screen {
    return {
      id: this.screenId,
      name: this.screenName,
      components: this.components,
      metadata: this.metadata,
    };
  }
}

/**
 * Helper function to create a new screen builder
 */
export function createScreen(screenId: string, screenName: string): SDUIBuilder {
  return new SDUIBuilder(screenId, screenName);
}

/**
 * Example usage export for reference
 */
export const exampleScreen = () => {
  return createScreen('home', 'Home Screen')
    .withMetadata('Welcome', 'This is a server-driven UI example')
    .addAlert('welcome-alert', {
      message: 'Welcome to SDUI Demo!',
      type: 'info',
      title: 'Hello',
      dismissible: true,
      icon: true,
    })
    .addInput('email-input', {
      placeholder: 'Enter your email',
      type: 'email',
      label: 'Email Address',
      required: true,
      fullWidth: true,
    })
    .addInput('password-input', {
      placeholder: 'Enter your password',
      type: 'password',
      label: 'Password',
      required: true,
      fullWidth: true,
    })
    .addButton('submit-btn', {
      label: 'Sign In',
      variant: 'primary',
      size: 'large',
      fullWidth: true,
    })
    .build();
};
