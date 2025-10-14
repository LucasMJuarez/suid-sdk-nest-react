/**
 * Screen View - Presentation Layer
 * Componente para renderizar una pantalla completa
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de mostrar la pantalla
 * - OCP: Extensible mediante props
 */

import React from 'react';
import type { ScreenDTO } from '../../application/dtos/screen.dto';
import { ComponentRenderer } from './ComponentRenderer.tsx';
import './ScreenView.css';

interface ScreenViewProps {
  screen: ScreenDTO;
}

export const ScreenView: React.FC<ScreenViewProps> = ({ screen }) => {
  return (
    <div 
      className={`screen-view ${screen.theme || 'light'} ${screen.responsive ? 'responsive' : ''}`}
      data-screen-id={screen.id}
    >
      <header className="screen-header">
        <h1>{screen.title}</h1>
        {screen.description && (
          <p className="screen-description">{screen.description}</p>
        )}
      </header>

      <main className="screen-content">
        {screen.components.map((component) => (
          <ComponentRenderer 
            key={component.id} 
            component={component} 
          />
        ))}
      </main>
    </div>
  );
};
