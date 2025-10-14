/**
 * SDUI Component Types
 * Define all possible component types that can be rendered dynamically
 */

export enum ComponentType {
  BUTTON = 'button',
  INPUT = 'input',
  ALERT = 'alert',
  CONTAINER = 'container',
}

/**
 * Base component interface
 */
export interface BaseComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

/**
 * Button component props
 */
export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: string; // Action identifier
}

/**
 * Input component props
 */
export interface InputProps {
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  label?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  error?: string;
}

/**
 * Alert component props
 */
export interface AlertProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  icon?: boolean;
}

/**
 * Container component props
 */
export interface ContainerProps {
  layout?: 'vertical' | 'horizontal' | 'grid';
  gap?: 'small' | 'medium' | 'large';
  padding?: 'small' | 'medium' | 'large';
  children?: UIComponent[];
}

/**
 * Union type for all component types
 */
export type UIComponent =
  | (BaseComponent & { type: ComponentType.BUTTON; props: ButtonProps })
  | (BaseComponent & { type: ComponentType.INPUT; props: InputProps })
  | (BaseComponent & { type: ComponentType.ALERT; props: AlertProps })
  | (BaseComponent & { type: ComponentType.CONTAINER; props: ContainerProps });

/**
 * Screen configuration
 */
export interface Screen {
  id: string;
  name: string;
  components: UIComponent[];
  metadata?: {
    title?: string;
    description?: string;
  };
}

/**
 * SDUI Response
 */
export interface SDUIResponse {
  screen: Screen;
  timestamp: number;
}
