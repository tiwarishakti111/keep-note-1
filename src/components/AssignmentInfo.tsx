import React, { useState } from 'react';
import { FileText, User, Database, Shield, Smartphone, Zap, X } from 'lucide-react';

export const AssignmentInfo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 left-4 z-40 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FileText className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-40 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Assignment Demo</h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-green-600" />
          <span>Authentication System ✓</span>
        </div>
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-green-600" />
          <span>CRUD Operations ✓</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span>State Management ✓</span>
        </div>
        <div className="flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-green-600" />
          <span>Responsive Design ✓</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-green-600" />
          <span>Hand-crafted UI ✓</span>
        </div>
      </div>
      
      <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
        <strong>Demo Account:</strong><br />
        Email: demo@example.com<br />
        Password: password
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Use the camera button to capture screenshots for your assignment documentation.
      </div>
    </div>
  );
};