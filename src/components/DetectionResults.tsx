import React from 'react';

interface DetectionResultsProps {
  predictions: string[];
  title?: string;
}

const DetectionResults: React.FC<DetectionResultsProps> = ({ 
  predictions, 
  title = 'Detection Results:' 
}) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    <ul className="space-y-1">
      {predictions.map((prediction, index) => (
        <li key={index} className="text-sm text-gray-600">{prediction}</li>
      ))}
    </ul>
  </div>
);

export default DetectionResults;