import React, { useState } from 'react';
import type { InputProps } from '../types/sdui.types';
import './Input.css';

export const Input: React.FC<InputProps> = ({
  placeholder,
  type = 'text',
  label,
  value: initialValue = '',
  disabled = false,
  required = false,
  fullWidth = false,
  error,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const containerClasses = [
    'sdui-input-container',
    fullWidth ? 'sdui-input-container--full-width' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'sdui-input',
    error ? 'sdui-input--error' : '',
    fullWidth ? 'sdui-input--full-width' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="sdui-input-label">
          {label}
          {required && <span className="sdui-input-required">*</span>}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      />
      {error && <span className="sdui-input-error-message">{error}</span>}
    </div>
  );
};
