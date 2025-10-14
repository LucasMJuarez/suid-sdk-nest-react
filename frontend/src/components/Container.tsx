import React from 'react';
import type { ContainerProps, UIComponent } from '../types/sdui.types';
import { Button } from './Button';
import { Input } from './Input';
import { Alert } from './Alert';
import './Container.css';

// Inline renderer to avoid circular dependency
const renderComponent = (component: UIComponent): React.ReactNode => {
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
      console.warn(`Unknown component type in container: ${(component as any).type}`);
      return null;
  }
};

export const Container: React.FC<ContainerProps> = ({
  layout = 'vertical',
  gap = 'medium',
  padding = 'medium',
  children = [],
}) => {
  const classNames = [
    'sdui-container',
    `sdui-container--${layout}`,
    `sdui-container--gap-${gap}`,
    `sdui-container--padding-${padding}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {children.map((component) => (
        <React.Fragment key={component.id}>
          {renderComponent(component)}
        </React.Fragment>
      ))}
    </div>
  );
};
