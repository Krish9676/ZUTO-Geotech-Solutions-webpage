import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = ({ onAreaSelect, selectedArea }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingMode, setDrawingMode] = useState('rectangle');
  const [rectangleBounds, setRectangleBounds] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [currentBounds, setCurrentBounds] = useState(null);

  // Map event handlers
  const MapEvents = () => {
    useMapEvents({
      mousedown: (e) => {
        if (isDrawing && drawingMode === 'rectangle') {
          setStartPoint(e.latlng);
        }
      },
      mousemove: (e) => {
        if (isDrawing && drawingMode === 'rectangle' && startPoint) {
          const bounds = L.latLngBounds(startPoint, e.latlng);
          setCurrentBounds(bounds);
        }
      },
      mouseup: (e) => {
        if (isDrawing && drawingMode === 'rectangle' && startPoint) {
          const bounds = L.latLngBounds(startPoint, e.latlng);
          setRectangleBounds(bounds);
          
          const coordinates = [
            bounds.getSouthWest().lng,
            bounds.getSouthWest().lat,
            bounds.getNorthEast().lng,
            bounds.getNorthEast().lat
          ];
          
          onAreaSelect({
            type: 'rectangle',
            coordinates: coordinates,
            bounds: bounds
          });
          
          setStartPoint(null);
          setCurrentBounds(null);
          setIsDrawing(false);
        }
      }
    });
    return null;
  };

  const startDrawing = (mode) => {
    setDrawingMode(mode);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[20.5937, 78.9629]} // Center on India
        zoom={5}
        className="w-full h-full rounded-lg"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        
        <MapEvents />
        
        {/* Display selected rectangle */}
        {rectangleBounds && (
          <Rectangle
            bounds={rectangleBounds}
            pathOptions={{
              color: '#3388ff',
              weight: 2,
              fillOpacity: 0.2
            }}
          />
        )}
        
        {/* Display current drawing rectangle */}
        {currentBounds && (
          <Rectangle
            bounds={currentBounds}
            pathOptions={{
              color: '#ff6b6b',
              weight: 2,
              fillOpacity: 0.1,
              dashArray: '5, 5'
            }}
          />
        )}
      </MapContainer>
      
      {/* Drawing Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 space-x-2 z-10">
        <button
          onClick={() => startDrawing('rectangle')}
          className={`px-3 py-2 text-sm rounded ${
            isDrawing && drawingMode === 'rectangle'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📐 Rectangle
        </button>
        <button
          onClick={stopDrawing}
          className="px-3 py-2 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200"
        >
          Stop
        </button>
      </div>

      {/* Instructions */}
      {isDrawing && (
        <div className="absolute bottom-4 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg z-10">
          <p className="text-sm">
            {drawingMode === 'rectangle' && 'Click and drag to draw a rectangle around your area of interest'}
          </p>
        </div>
      )}

      {/* Selected Area Info */}
      {selectedArea && (
        <div className="absolute top-4 right-4 bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg max-w-xs z-10">
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

export default InteractiveMap;
