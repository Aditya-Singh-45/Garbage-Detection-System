import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

// Initialize TensorFlow.js with WebGL backend
export const initTensorFlow = async () => {
  // Try WebGL first, fall back to CPU if necessary
  try {
    await tf.setBackend('webgl');
  } catch (e) {
    console.warn('WebGL backend not available, falling back to CPU');
    await tf.setBackend('cpu');
  }
  await tf.ready();
};

// Load and cache the MobileNet model
let cachedModel: mobilenet.MobileNet | null = null;

export const loadModel = async () => {
  if (!cachedModel) {
    cachedModel = await mobilenet.load({
      version: 2,
      alpha: 1.0
    });
  }
  return cachedModel;
};

export const classifyImage = async (
  image: HTMLImageElement | HTMLVideoElement,
  model: mobilenet.MobileNet
) => {
  try {
    const predictions = await model.classify(image);
    return predictions.map(
      (p) => `${p.className} (${(p.probability * 100).toFixed(2)}%)`
    );
  } catch (error) {
    console.error('Classification error:', error);
    return ['Error during classification'];
  }
};