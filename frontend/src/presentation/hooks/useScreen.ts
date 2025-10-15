/**
 * useScreen Hook - Presentation Layer
 * Custom hook para gestionar pantallas con arquitectura hexagonal
 * 
 * SOLID Principles:
 * - SRP: Solo responsable de conectar UI con use cases
 * - DIP: Depende de abstracciones (IScreenService)
 */

import { useState, useEffect } from 'react';
import type { ScreenDTO } from '../../application/dtos/screen.dto';
import { getScreenService } from '../../infrastructure/di/container';

interface UseScreenResult {
  screen: ScreenDTO | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener una pantalla por ID
 */
export function useScreen(screenId: string): UseScreenResult {
  const [screen, setScreen] = useState<ScreenDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const screenService = getScreenService();

  const fetchScreen = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await screenService.getScreenById(screenId);
      setScreen(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setScreen(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (screenId) {
      fetchScreen();
    }
  }, [screenId]);

  return {
    screen,
    loading,
    error,
    refetch: fetchScreen,
  };
}

/**
 * Hook para obtener la pantalla home
 */
export function useHomeScreen(): UseScreenResult {
  const [screen, setScreen] = useState<ScreenDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const screenService = getScreenService();

  const fetchScreen = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await screenService.getHomeScreen();
      setScreen(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setScreen(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScreen();
  }, []);

  return {
    screen,
    loading,
    error,
    refetch: fetchScreen,
  };
}

/**
 * Hook para obtener todas las pantallas
 */
export function useAllScreens() {
  const [screens, setScreens] = useState<ScreenDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const screenService = getScreenService();

  const fetchScreens = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await screenService.getAllScreens();
      setScreens(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setScreens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScreens();
  }, []);

  return {
    screens,
    loading,
    error,
    refetch: fetchScreens,
  };
}
