import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
    <p className="font-medium">Error loading model:</p>
    <p className="text-sm">{message}</p>
  </div>
);

export default ErrorMessage;