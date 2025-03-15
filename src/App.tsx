import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Video } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import VideoDetection from './components/VideoDetection';
import LiveCamera from './components/LiveCamera';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useModel } from './hooks/useModel';

type DetectionMode = 'image' | 'video' | 'camera';

function App() {
  const [mode, setMode] = useState<DetectionMode>('image');
  const { model, isLoading, error } = useModel();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Garbage Detection System
          </h1>
          <p className="text-gray-600 text-center">
            Detect and classify garbage using image, video, or live camera
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { mode: 'image', icon: ImageIcon, label: 'Image Upload' },
            { mode: 'video', icon: Video, label: 'Video Detection' },
            { mode: 'camera', icon: Camera, label: 'Live Camera' },
          ].map(({ mode: buttonMode, icon: Icon, label }) => (
            <button
              key={buttonMode}
              onClick={() => setMode(buttonMode as DetectionMode)}
              className={`p-4 rounded-lg flex flex-col items-center ${
                mode === buttonMode ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {mode === 'image' && model && <ImageUpload model={model} />}
          {mode === 'video' && model && <VideoDetection model={model} />}
          {mode === 'camera' && model && <LiveCamera model={model} />}
        </div>
      </div>
    </div>
  );
}

export default App;