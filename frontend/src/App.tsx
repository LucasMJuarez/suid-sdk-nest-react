/**
 * App Component - Entry Point with Hexagonal Architecture
 * Usa hooks y componentes de la Presentation Layer
 */

import { useHomeScreen } from './presentation/hooks/useScreen';
import { ScreenView } from './presentation/components/ScreenView';
import { Loading } from './presentation/components/Loading';
import { ErrorView } from './presentation/components/ErrorView';
import './index.css';

function App() {
  const { screen, loading, error, refetch } = useHomeScreen();

  if (loading) {
    return <Loading message="Loading Home Screen..." />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={refetch} />;
  }

  if (!screen) {
    return <ErrorView error="No screen data available" onRetry={refetch} />;
  }

  return <ScreenView screen={screen} />;
}

export default App;
