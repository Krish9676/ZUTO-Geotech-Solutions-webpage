import { useState } from 'react';

const SimpleMap = ({ onAreaSelect, selectedArea }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);

  const handleMouseDown = (e) => {
    if (isDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStartPoint({ x, y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDrawing && startPoint) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCurrentRect({
        x: Math.min(startPoint.x, x),
        y: Math.min(startPoint.y, y),
        width: Math.abs(x - startPoint.x),
        height: Math.abs(y - startPoint.y)
      });
    }
  };

  const handleMouseUp = (e) => {
    if (isDrawing && startPoint && currentRect) {
      // Convert screen coordinates to approximate lat/lng
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Simple approximation for India region
      const lat = 20.5937 + (centerY - currentRect.y - currentRect.height/2) * 0.01;
      const lng = 78.9629 + (currentRect.x + currentRect.width/2 - centerX) * 0.01;
      
      const coordinates = [
        lng - 0.1, // West
        lat - 0.1, // South
        lng + 0.1, // East
        lat + 0.1  // North
      ];
      
      onAreaSelect({
        type: 'rectangle',
        coordinates: coordinates
      });
      
      setStartPoint(null);
      setCurrentRect(null);
      setIsDrawing(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Simple Map Background */}
      <div 
        className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-gray-300 relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Map-like background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>
        
        {/* Current drawing rectangle */}
        {currentRect && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30"
            style={{
              left: currentRect.x,
              top: currentRect.y,
              width: currentRect.width,
              height: currentRect.height
            }}
          />
        )}
        
        {/* Map center indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
        
        {/* Map text */}
        <div className="absolute top-4 left-4 text-gray-600 text-sm font-medium">
          Interactive Map (Click & Drag to Draw)
        </div>
      </div>
      
      {/* Drawing Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-x-2 z-10">
        <button
          onClick={() => setIsDrawing(true)}
          className={`px-3 py-2 text-sm rounded ${
            isDrawing
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📐 Draw Rectangle
        </button>
        <button
          onClick={() => {
            setIsDrawing(false);
            setStartPoint(null);
            setCurrentRect(null);
          }}
          className="px-3 py-2 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200"
        >
          Stop
        </button>
      </div>

      {/* Instructions */}
      {isDrawing && (
        <div className="absolute bottom-4 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg z-10">
          <p className="text-sm">
            Click and drag to draw a rectangle around your area of interest
          </p>
        </div>
      )}

      {/* Selected Area Info */}
      {selectedArea && (
        <div className="absolute top-4 left-4 bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg max-w-xs z-10">
          <h3 className="font-semibold mb-1">Selected Area</h3>
          <p className="text-sm">
            {selectedArea.type === 'rectangle' && 'Rectangle drawn on map'}
            {selectedArea.type === 'coordinates' && 'Coordinates entered'}
            {selectedArea.type === 'uploaded' && 'Shapefile uploaded'}
          </p>
          {selectedArea.coordinates && (
            <p className="text-xs mt-1 font-mono">
              {selectedArea.coordinates.map(coord => coord.toFixed(4)).join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleMap;
