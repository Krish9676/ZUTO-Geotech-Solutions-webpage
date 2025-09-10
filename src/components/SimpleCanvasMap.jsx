import { useState, useRef, useEffect } from 'react';

const SimpleCanvasMap = ({ onBoundarySelect, initialCenter = [77.2090, 28.6139], initialZoom = 10 }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [completedPolygons, setCompletedPolygons] = useState([]);
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);
  const [coordinates, setCoordinates] = useState('');

  // Convert lat/lng to canvas coordinates
  const latLngToCanvas = (lat, lng) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Simple projection - center is [lng, lat]
    const scale = Math.pow(2, zoom);
    const x = ((lng - center[0]) * scale + 0.5) * width;
    const y = ((center[1] - lat) * scale + 0.5) * height;
    
    return { x, y };
  };

  // Convert canvas coordinates to lat/lng
  const canvasToLatLng = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    
    const width = canvas.width;
    const height = canvas.height;
    
    const scale = Math.pow(2, zoom);
    const lng = center[0] + (x / width - 0.5) / scale;
    const lat = center[1] - (y / height - 0.5) / scale;
    
    return [lat, lng];
  };

  // Draw the map
  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background with satellite-like appearance
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f8ff');
    gradient.addColorStop(0.3, '#e6f3ff');
    gradient.addColorStop(0.7, '#cce7ff');
    gradient.addColorStop(1, '#b3d9ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add some terrain-like features
    ctx.fillStyle = 'rgba(144, 238, 144, 0.3)'; // Light green for vegetation
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 100 + 50;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Add some water-like features
    ctx.fillStyle = 'rgba(135, 206, 235, 0.4)'; // Light blue for water
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 80 + 30;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Draw grid
    ctx.strokeStyle = '#b3d9ff';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw completed polygons
    completedPolygons.forEach((polygon, index) => {
      if (polygon.length < 2) return;
      
      ctx.strokeStyle = '#3388ff';
      ctx.fillStyle = 'rgba(51, 136, 255, 0.2)';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      polygon.forEach((point, i) => {
        const canvasPoint = latLngToCanvas(point[0], point[1]);
        if (i === 0) {
          ctx.moveTo(canvasPoint.x, canvasPoint.y);
        } else {
          ctx.lineTo(canvasPoint.x, canvasPoint.y);
        }
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw points
      ctx.fillStyle = '#3388ff';
      polygon.forEach(point => {
        const canvasPoint = latLngToCanvas(point[0], point[1]);
        ctx.beginPath();
        ctx.arc(canvasPoint.x, canvasPoint.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
    
    // Draw current polygon being drawn
    if (currentPolygon.length > 0) {
      ctx.strokeStyle = '#ff6b6b';
      ctx.fillStyle = 'rgba(255, 107, 107, 0.2)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      currentPolygon.forEach((point, i) => {
        const canvasPoint = latLngToCanvas(point[0], point[1]);
        if (i === 0) {
          ctx.moveTo(canvasPoint.x, canvasPoint.y);
        } else {
          ctx.lineTo(canvasPoint.x, canvasPoint.y);
        }
      });
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw points
      ctx.fillStyle = '#ff6b6b';
      currentPolygon.forEach(point => {
        const canvasPoint = latLngToCanvas(point[0], point[1]);
        ctx.beginPath();
        ctx.arc(canvasPoint.x, canvasPoint.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    
    // Draw center marker
    const centerPoint = latLngToCanvas(center[1], center[0]);
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(centerPoint.x, centerPoint.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Handle mouse events
  const handleMouseDown = (e) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const [lat, lng] = canvasToLatLng(x, y);
    setCurrentPolygon(prev => [...prev, [lat, lng]]);
  };

  const handleMouseMove = (e) => {
    // Could add hover effects here
  };

  const handleMouseUp = (e) => {
    // Polygon completion is handled by double-click
  };

  const handleDoubleClick = (e) => {
    if (currentPolygon.length >= 3) {
      // Complete the polygon
      const newPolygon = [...currentPolygon];
      setCompletedPolygons(prev => [...prev, newPolygon]);
      setCurrentPolygon([]);
      
      // Notify parent component
      onBoundarySelect(newPolygon);
    }
  };

  // Handle coordinate input
  const handleCoordinateInput = () => {
    try {
      const coords = JSON.parse(coordinates);
      if (Array.isArray(coords) && coords.length >= 3) {
        // Validate coordinates
        const validCoords = coords.filter(coord => 
          Array.isArray(coord) && 
          coord.length === 2 && 
          typeof coord[0] === 'number' && 
          typeof coord[1] === 'number' &&
          coord[0] >= -90 && coord[0] <= 90 && // lat
          coord[1] >= -180 && coord[1] <= 180  // lng
        );
        
        if (validCoords.length >= 3) {
          setCompletedPolygons([validCoords]);
          onBoundarySelect(validCoords);
        } else {
          alert('Invalid coordinates. Please ensure all coordinates are valid lat/lng pairs.');
        }
      } else {
        alert('Invalid format. Please use: [[lat1, lng1], [lat2, lng2], ...]');
      }
    } catch (error) {
      alert('Invalid JSON format. Please use: [[lat1, lng1], [lat2, lng2], ...]');
    }
  };

  // Handle center and zoom input
  const handleCenterInput = () => {
    try {
      const [lng, lat] = center.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lng) && !isNaN(lat)) {
        setCenter([lng, lat]);
        drawMap();
      }
    } catch (error) {
      alert('Invalid center coordinates. Use format: lng, lat');
    }
  };

  // Clear all polygons
  const clearPolygons = () => {
    setCompletedPolygons([]);
    setCurrentPolygon([]);
    onBoundarySelect(null);
    setCoordinates('');
  };

  // Start drawing
  const startDrawing = () => {
    setIsDrawing(true);
    setCurrentPolygon([]);
  };

  // Stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
    setCurrentPolygon([]);
  };

  // Redraw when dependencies change
  useEffect(() => {
    drawMap();
  }, [completedPolygons, currentPolygon, center, zoom]);

  // Set up canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawMap();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Canvas Map */}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg border-2 border-gray-300 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      />
      
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
            value={center.join(', ')}
            onChange={(e) => setCenter(e.target.value.split(',').map(coord => parseFloat(coord.trim())))}
            placeholder="77.2090, 28.6139"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex space-x-2">
            <input
              type="number"
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
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
              className={`flex-1 px-3 py-2 text-sm rounded ${
                isDrawing
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              📐 Draw Polygon
            </button>
            <button
              onClick={stopDrawing}
              className="flex-1 px-3 py-2 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200"
            >
              Stop
            </button>
          </div>
          <button
            onClick={clearPolygons}
            className="w-full px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            🗑️ Clear All
          </button>
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
      <div className="absolute bottom-4 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg z-10">
        <p className="text-sm">
          {isDrawing 
            ? "Click to add points to your polygon. Double-click to complete the polygon."
            : "Click 'Draw Polygon' to start drawing your farm boundary, or enter coordinates manually."
          }
        </p>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
        Canvas Map - Center: {center[1].toFixed(4)}°, {center[0].toFixed(4)}° | Zoom: {zoom}
      </div>
    </div>
  );
};

export default SimpleCanvasMap;
