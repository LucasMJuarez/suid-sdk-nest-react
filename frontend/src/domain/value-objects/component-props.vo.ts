/**
 * Component Props Value Objects - Domain Layer
 * Define las propiedades específicas de cada tipo de componente
 */

import type { ComponentEntity } from '../entities/component.entity';

/**
 * Base Props - Propiedades comunes a todos los componentes
 */
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  testId?: string;
}

/**
 * Button Props - Propiedades del botón
 */
export interface ButtonProps extends BaseProps {
  text: string;
  onClick?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Input Props - Propiedades del input
 */
export interface InputProps extends BaseProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  value?: string;
  onChange?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

/**
 * Alert Props - Propiedades de la alerta
 */
export interface AlertProps extends BaseProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: string;
}

/**
 * Container Props - Propiedades del contenedor
 */
export interface ContainerProps extends BaseProps {
  layout?: 'vertical' | 'horizontal' | 'grid';
  gap?: number;
  padding?: number;
  children?: ComponentEntity[];
}

/**
 * Union type de todas las props posibles
 */
export type ComponentProps = ButtonProps | InputProps | AlertProps | ContainerProps;

/**
 * Type guards para verificar el tipo de props
 */
export function isButtonProps(props: ComponentProps): props is ButtonProps {
  return 'text' in props;
}

export function isInputProps(props: ComponentProps): props is InputProps {
  return 'label' in props;
}

export function isAlertProps(props: ComponentProps): props is AlertProps {
  return 'message' in props;
}

export function isContainerProps(props: ComponentProps): props is ContainerProps {
  return 'layout' in props || 'children' in props;
}
