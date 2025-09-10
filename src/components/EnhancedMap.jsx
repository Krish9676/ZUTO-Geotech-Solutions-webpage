import { useState, useEffect, useRef } from 'react';
import SimpleCanvasMap from './SimpleCanvasMap';

// Try to import Mapbox, but fallback to canvas if it fails
let mapboxgl, MapboxDraw;
try {
  mapboxgl = require('mapbox-gl');
  MapboxDraw = require('@mapbox/mapbox-gl-draw');
  require('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css');
} catch (error) {
  console.warn('Mapbox GL not available, using canvas fallback');
}

const EnhancedMap = ({ onBoundarySelect, initialCenter = [77.2090, 28.6139], initialZoom = 10 }) => {
  const [useCanvasFallback, setUseCanvasFallback] = useState(false);

  // Check if Mapbox is available
  useEffect(() => {
    if (!mapboxgl || !MapboxDraw) {
      setUseCanvasFallback(true);
    }
  }, []);

  // If Mapbox is not available, use canvas fallback
  if (useCanvasFallback) {
    return <SimpleCanvasMap onBoundarySelect={onBoundarySelect} initialCenter={initialCenter} initialZoom={initialZoom} />;
  }

  const mapContainer = useRef(null);
  const map = useRef(null);
  const draw = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState('');
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    try {
      // Set a default access token (you can replace this with your own)
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: center,
        zoom: zoom,
        attributionControl: false
      });

      // Initialize draw tools
      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        },
        defaultMode: 'draw_polygon'
      });

      map.current.addControl(draw.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      }), 'bottom-left');

      map.current.on('load', () => {
        setIsMapLoaded(true);
      });

      // Handle draw events
      map.current.on('draw.create', (e) => {
        const features = e.features;
        if (features.length > 0) {
          const feature = features[0];
          const coords = feature.geometry.coordinates[0];
          onBoundarySelect(coords);
        }
      });

      map.current.on('draw.update', (e) => {
        const features = e.features;
        if (features.length > 0) {
          const feature = features[0];
          const coords = feature.geometry.coordinates[0];
          onBoundarySelect(coords);
        }
      });

      map.current.on('draw.delete', () => {
        onBoundarySelect(null);
      });

    } catch (error) {
      console.error('Error initializing Mapbox:', error);
      setUseCanvasFallback(true);
    }

  }, []);

  // Handle coordinate input
  const handleCoordinateInput = () => {
    try {
      const coords = JSON.parse(coordinates);
      if (Array.isArray(coords) && coords.length >= 3) {
        // Clear existing drawings
        if (draw.current) {
          draw.current.deleteAll();
        }
        
        // Create polygon from coordinates
        const polygon = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coords]
          }
        };
        
        draw.current.add(polygon);
        onBoundarySelect(coords);
      }
    } catch (error) {
      alert('Invalid coordinate format. Please use: [[lat1, lng1], [lat2, lng2], ...]');
    }
  };

  // Handle center and zoom input
  const handleCenterInput = () => {
    try {
      const [lng, lat] = center.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lng) && !isNaN(lat)) {
        map.current.flyTo({ center: [lng, lat], zoom: parseInt(zoom) });
      }
    } catch (error) {
      alert('Invalid center coordinates. Use format: lng, lat');
    }
  };

  // Clear all drawings
  const clearDrawings = () => {
    if (draw.current) {
      draw.current.deleteAll();
    }
    onBoundarySelect(null);
    setCoordinates('');
  };

  // Start drawing mode
  const startDrawing = () => {
    if (draw.current) {
      draw.current.changeMode('draw_polygon');
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {/* Controls Panel */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 space-y-4 z-10 max-w-sm">
        <h3 className="font-semibold text-gray-900">Farm Boundary Mapping</h3>
        
        {/* Center and Zoom Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Map Center (Lng, Lat)
          </label>
          <input
            type="text"
            value={center}
            onChange={(e) => setCenter(e.target.value)}
            placeholder="77.2090, 28.6139"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex space-x-2">
            <input
              type="number"
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              placeholder="10"
              min="1"
              max="20"
              className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleCenterInput}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go
            </button>
          </div>
        </div>

        {/* Coordinate Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Or Enter Coordinates
          </label>
          <textarea
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
            placeholder="[[lat1, lng1], [lat2, lng2], [lat3, lng3], ...]"
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleCoordinateInput}
            className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Load Coordinates
          </button>
        </div>

        {/* Drawing Controls */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Drawing Tools
          </label>
          <div className="flex space-x-2">
            <button
              onClick={startDrawing}
              className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              📐 Draw Polygon
            </button>
            <button
              onClick={clearDrawings}
              className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Quick Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                const coords = [
                  [28.6139, 77.2090],
                  [28.6149, 77.2090],
                  [28.6149, 77.2100],
                  [28.6139, 77.2100],
                  [28.6139, 77.2090]
                ];
                setCoordinates(JSON.stringify(coords));
                handleCoordinateInput();
              }}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Delhi Sample
            </button>
            <button
              onClick={() => {
                const coords = [
                  [12.9716, 77.5946],
                  [12.9726, 77.5946],
                  [12.9726, 77.5956],
                  [12.9716, 77.5956],
                  [12.9716, 77.5946]
                ];
                setCoordinates(JSON.stringify(coords));
                handleCoordinateInput();
              }}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Bangalore Sample
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading Map...</p>
          </div>
        </div>
      )}

      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
        © Mapbox © OpenStreetMap
      </div>
    </div>
  );
};

export default EnhancedMap;
