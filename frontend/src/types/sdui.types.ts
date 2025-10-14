/**
 * SDUI Component Types - Frontend
 * These types mirror the backend types for type safety
 */

export const ComponentType = {
  BUTTON: 'button',
  INPUT: 'input',
  ALERT: 'alert',
  CONTAINER: 'container',
} as const;

export type ComponentType = typeof ComponentType[keyof typeof ComponentType];

export interface BaseComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: string;
}

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

export interface AlertProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  icon?: boolean;
}

export interface ContainerProps {
  layout?: 'vertical' | 'horizontal' | 'grid';
  gap?: 'small' | 'medium' | 'large';
  padding?: 'small' | 'medium' | 'large';
  children?: UIComponent[];
}

export type UIComponent =
  | (BaseComponent & { type: 'button'; props: ButtonProps })
  | (BaseComponent & { type: 'input'; props: InputProps })
  | (BaseComponent & { type: 'alert'; props: AlertProps })
  | (BaseComponent & { type: 'container'; props: ContainerProps });

export interface Screen {
  id: string;
  name: string;
  components: UIComponent[];
  metadata?: {
    title?: string;
    description?: string;
  };
}

export interface SDUIResponse {
  screen: Screen;
  timestamp: number;
}
