import { useState, useEffect } from 'react';
import type { Screen } from './types/sdui.types';
import { sduiClient } from './services/sdui.client';
import { ComponentRenderer } from './components/ComponentRenderer';
import './App.css';

function App() {
  const [screen, setScreen] = useState<Screen | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadScreen();
  }, []);

  const loadScreen = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sduiClient.getDashboardScreen();
      setScreen(response.screen);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load screen');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading SDUI
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error Loading Screen</h2>
        <p>{error}</p>
        <button onClick={loadScreen}>Retry</button>
      </div>
    );
  }

  if (!screen) {
    return <div className="error">No screen data available</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">{screen.metadata?.title || screen.name}</h1>
        {screen.metadata?.description && (
          <p className="app-subtitle">{screen.metadata.description}</p>
        )}
      </header>

      <main className="app-container">
        {screen.components.map((component) => (
          <div key={component.id} className="component-wrapper">
            <ComponentRenderer component={component} />
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
