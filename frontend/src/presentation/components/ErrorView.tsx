/**
 * Error Component - Presentation Layer
 * Componente para mostrar errores
 */

import React from 'react';
import './ErrorView.css';

interface ErrorViewProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{error}</p>
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
