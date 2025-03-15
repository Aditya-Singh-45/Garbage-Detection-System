import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, AlertCircle } from 'lucide-react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { classifyImage } from '../utils/tensorflow';
import DetectionResults from './DetectionResults';

interface VideoDetectionProps {
  model: mobilenet.MobileNet;
  videoSrc?: string;
}

const VideoDetection: React.FC<VideoDetectionProps> = ({ model }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Using a sample video that's known to exist
  const defaultVideoUrl = 'https://storage.googleapis.com/tfjs-models/assets/mobilenet/object_detection_video.mp4';

  const detectObjects = async () => {
    if (!videoRef.current) return;
    try {
      const results = await classifyImage(videoRef.current, model);
      setPredictions(results);
    } catch (err) {
      setError('Error during object detection');
      console.error(err);
    }
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          setError('Error playing video');
          console.error(err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(detectObjects, 1000) as unknown as number;
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleVideoError = () => {
    setError('Error loading video');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <video
          ref={videoRef}
          src={defaultVideoUrl}
          className="w-full rounded-lg"
          controls={false}
          onError={handleVideoError}
          playsInline
        />
        <button
          onClick={togglePlayback}
          className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      )}
      
      <DetectionResults predictions={predictions} title="Detected Objects:" />
    </div>
  );
};

export default VideoDetection;