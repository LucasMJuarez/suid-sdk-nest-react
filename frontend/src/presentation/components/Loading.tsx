/**
 * Loading Component - Presentation Layer
 * Componente reutilizable de carga
 */

import React from 'react';
import './Loading.css';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};
