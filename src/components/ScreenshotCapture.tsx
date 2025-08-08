import React, { useState } from 'react';
import { Camera, Download, FileImage } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ScreenshotCaptureProps {
  targetId?: string;
  filename?: string;
  className?: string;
}

export const ScreenshotCapture: React.FC<ScreenshotCaptureProps> = ({
  targetId = 'root',
  filename = 'screenshot',
  className = ''
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [lastScreenshot, setLastScreenshot] = useState<string | null>(null);

  const captureScreenshot = async () => {
    setIsCapturing(true);
    try {
      const element = document.getElementById(targetId) || document.body;
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        height: window.innerHeight,
        width: window.innerWidth,
        scrollX: 0,
        scrollY: 0
      });

      // Convert to blob and create download link
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setLastScreenshot(url);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = `${filename}-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up after a delay
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
      }, 'image/png', 1.0);
      
    } catch (error) {
      console.error('Screenshot capture failed:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="flex items-center space-x-2 mb-2">
          <FileImage className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Assignment Screenshots</span>
        </div>
        
        <button
          onClick={captureScreenshot}
          disabled={isCapturing}
          className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm w-full"
        >
          {isCapturing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Capturing...</span>
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              <span>Take Screenshot</span>
            </>
          )}
        </button>
        
        {lastScreenshot && (
          <div className="mt-2 text-xs text-green-600 flex items-center space-x-1">
            <Download className="w-3 h-3" />
            <span>Screenshot saved!</span>
          </div>
        )}
      </div>
    </div>
  );
};