import React, { useState } from 'react';
import type { AlertProps } from '../types/sdui.types';
import './Alert.css';

export const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  title,
  dismissible = false,
  icon = true,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const getIcon = () => {
    if (!icon) return null;

    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };

    return <span className="sdui-alert-icon">{icons[type]}</span>;
  };

  const classNames = [
    'sdui-alert',
    `sdui-alert--${type}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert">
      <div className="sdui-alert-content">
        {getIcon()}
        <div className="sdui-alert-text">
          {title && <div className="sdui-alert-title">{title}</div>}
          <div className="sdui-alert-message">{message}</div>
        </div>
      </div>
      {dismissible && (
        <button
          className="sdui-alert-dismiss"
          onClick={() => setVisible(false)}
          aria-label="Dismiss alert"
        >
          ×
        </button>
      )}
    </div>
  );
};
