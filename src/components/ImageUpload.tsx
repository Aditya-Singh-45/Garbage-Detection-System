import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { classifyImage } from '../utils/tensorflow';
import DetectionResults from './DetectionResults';

interface ImageUploadProps {
  model: mobilenet.MobileNet;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ model }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<string[]>([]);

  const handleImageUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      const results = await classifyImage(img, model);
      setPredictions(results);
    };
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
      </div>

      {selectedImage && (
        <div className="space-y-4">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="max-w-full rounded-lg"
          />
          <DetectionResults predictions={predictions} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;