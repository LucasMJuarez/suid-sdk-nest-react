import React from 'react';
import type { UIComponent } from '../types/sdui.types';
import { Button } from './Button';
import { Input } from './Input';
import { Alert } from './Alert';
import { Container } from './Container';

interface ComponentRendererProps {
  component: UIComponent;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const handleAction = () => {
    console.log(`Action triggered for component: ${component.id}`);
  };

  switch (component.type) {
    case 'button':
      return <Button {...component.props} onClick={handleAction} />;
    
    case 'input':
      return <Input {...component.props} />;
    
    case 'alert':
      return <Alert {...component.props} />;
    
    case 'container':
      return <Container {...component.props} />;
    
    default:
      console.warn(`Unknown component type: ${(component as any).type}`);
      return null;
  }
};
