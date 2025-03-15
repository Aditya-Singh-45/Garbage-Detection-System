import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Camera } from 'lucide-react';
import { classifyImage } from '../utils/tensorflow';
import DetectionResults from './DetectionResults';

interface LiveCameraProps {
  model: mobilenet.MobileNet;
}

const LiveCamera: React.FC<LiveCameraProps> = ({ model }) => {
  const webcamRef = useRef<Webcam>(null);
  const [predictions, setPredictions] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current) {
        const image = webcamRef.current.getScreenshot();
        if (image) {
          const img = new Image();
          img.src = image;
          img.onload = async () => {
            const results = await classifyImage(img, model);
            setPredictions(results);
          };
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [model]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="w-full rounded-lg"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
          <Camera className="h-6 w-6 text-red-500 animate-pulse" />
        </div>
      </div>
      <DetectionResults predictions={predictions} title="Live Detection:" />
    </div>
  );
};

export default LiveCamera;