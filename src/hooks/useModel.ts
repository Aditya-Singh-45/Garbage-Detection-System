import { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { initTensorFlow, loadModel } from '../utils/tensorflow';

export const useModel = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initTensorFlow();
        const loadedModel = await loadModel();
        setModel(loadedModel);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load model');
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return { model, isLoading, error };
};