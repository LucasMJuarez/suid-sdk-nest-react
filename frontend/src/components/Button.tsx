import React from 'react';
import type { ButtonProps } from '../types/sdui.types';
import './Button.css';

interface DynamicButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick?: () => void;
}

export const Button: React.FC<DynamicButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
}) => {
  const classNames = [
    'sdui-button',
    `sdui-button--${variant}`,
    `sdui-button--${size}`,
    fullWidth ? 'sdui-button--full-width' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};
