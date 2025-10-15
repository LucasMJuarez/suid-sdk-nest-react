/**
 * Component Renderer - Presentation Layer
 * Renderiza dinámicamente componentes según su tipo
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de renderizar componentes
 * - OCP: Extensible para nuevos tipos de componentes
 */

import React from 'react';
import type { ComponentDTO } from '../../application/dtos/screen.dto';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from '../../components/Alert';
import { Container } from '../../components/Container';

interface ComponentRendererProps {
  component: ComponentDTO;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  switch (component.type) {
    case 'button':
      // Adaptar props de DTO a componente Button
      return <Button label={component.props.text || component.props.label} {...component.props} />;
    
    case 'input':
      return <Input {...component.props} />;
    
    case 'alert':
      return <Alert message={component.props.message} {...component.props} />;
    
    case 'container':
      return (
        <Container {...component.props}>
          {component.props.children?.map((child: ComponentDTO) => (
            <ComponentRenderer key={child.id} component={child} />
          ))}
        </Container>
      );
    
    default:
      console.warn(`Unknown component type: ${component.type}`);
      return null;
  }
};
