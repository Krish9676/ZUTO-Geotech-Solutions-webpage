import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LeafletMap = ({ onBoundarySelect, initialCenter = [28.6139, 77.2090], initialZoom = 10 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const drawControlRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [coordinates, setCoordinates] = useState('');
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    // Initialize map
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true
      });

      // Add satellite tile layer
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a> — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
      }).addTo(map);

      // Create feature group for drawn items
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      drawnItemsRef.current = drawnItems;

      // Initialize draw control
      const drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
            drawError: {
              color: '#e1e100',
              message: '<strong>Error:</strong> shape edges cannot cross!'
            },
            shapeOptions: {
              color: '#3388ff',
              fillColor: '#3388ff',
              fillOpacity: 0.2,
              weight: 3
            },
            // Enable proper polygon drawing
            allowIntersection: false,
            showLength: true,
            metric: true,
            feet: false
          },
          rectangle: {
            shapeOptions: {
              color: '#3388ff',
              fillColor: '#3388ff',
              fillOpacity: 0.2,
              weight: 3
            }
          },
          circle: false,
          marker: false,
          circlemarker: false,
          polyline: false
        },
        edit: {
          featureGroup: drawnItems,
          remove: true
        }
      });

      map.addControl(drawControl);
      drawControlRef.current = drawControl;

      // Handle draw events
      map.on(L.Draw.Event.CREATED, (e) => {
        const { layerType, layer } = e;
        
        // Clear existing items
        drawnItems.clearLayers();
        
        // Add new layer
        drawnItems.addLayer(layer);
        
        // Get coordinates based on layer type
        let latlngs = [];
        if (layerType === 'polygon') {
          // Get the first ring of the polygon (exterior ring)
          const ring = layer.getLatLngs()[0];
          latlngs = ring.map(latlng => [latlng.lat, latlng.lng]);
          
          // Ensure the polygon is closed (first and last points are the same)
          if (latlngs.length > 0) {
            const firstPoint = latlngs[0];
            const lastPoint = latlngs[latlngs.length - 1];
            if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
              latlngs.push([firstPoint[0], firstPoint[1]]);
            }
          }
        } else if (layerType === 'rectangle') {
          const bounds = layer.getBounds();
          latlngs = [
            [bounds.getNorth(), bounds.getWest()],
            [bounds.getNorth(), bounds.getEast()],
            [bounds.getSouth(), bounds.getEast()],
            [bounds.getSouth(), bounds.getWest()],
            [bounds.getNorth(), bounds.getWest()] // Close the rectangle
          ];
        }
        
        console.log('Drawn layer type:', layerType);
        console.log('Coordinates:', latlngs);
        console.log('Number of points:', latlngs.length);
        
        // Validate coordinates before calling callback
        if (latlngs.length >= 3) {
          onBoundarySelect(latlngs);
        } else {
          console.warn('Invalid polygon: Need at least 3 points');
          alert('Please draw a valid polygon with at least 3 points');
        }
      });

      map.on(L.Draw.Event.EDITED, (e) => {
        const { layers } = e;
        layers.eachLayer((layer) => {
          if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
            let latlngs = [];
            if (layer instanceof L.Polygon) {
              latlngs = layer.getLatLngs()[0].map(latlng => [latlng.lat, latlng.lng]);
            } else if (layer instanceof L.Rectangle) {
              const bounds = layer.getBounds();
              latlngs = [
                [bounds.getNorth(), bounds.getWest()],
                [bounds.getNorth(), bounds.getEast()],
                [bounds.getSouth(), bounds.getEast()],
                [bounds.getSouth(), bounds.getWest()],
                [bounds.getNorth(), bounds.getWest()]
              ];
            }
            onBoundarySelect(latlngs);
          }
        });
      });

      map.on(L.Draw.Event.DELETED, () => {
        drawnItems.clearLayers();
        onBoundarySelect(null);
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setMapReady(false);
      }
    };
  }, []);

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
          // Clear existing drawings
          if (drawnItemsRef.current) {
            drawnItemsRef.current.clearLayers();
          }
          
          // Create polygon from coordinates
          const polygon = L.polygon(validCoords, {
            color: '#3388ff',
            fillColor: '#3388ff',
            fillOpacity: 0.2,
            weight: 3
          });
          
          // Add to map
          if (drawnItemsRef.current) {
            drawnItemsRef.current.addLayer(polygon);
          }
          
          // Center map on the polygon
          if (mapInstanceRef.current) {
            const bounds = L.latLngBounds(validCoords);
            mapInstanceRef.current.fitBounds(bounds);
          }
          
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
      const [lat, lng] = center.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], parseInt(zoom));
        }
      }
    } catch (error) {
      alert('Invalid center coordinates. Use format: lat, lng');
    }
  };

  // Clear all drawings
  const clearDrawings = () => {
    if (drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
    }
    onBoundarySelect(null);
    setCoordinates('');
  };

  return (
    <div className="w-full h-full relative">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '500px' }}
      />
      
      {/* Controls Panel */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 space-y-4 z-10 max-w-sm">
        <h3 className="font-semibold text-gray-900">Farm Boundary Mapping</h3>
        
        {/* Center and Zoom Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Map Center (Lat, Lng)
          </label>
          <input
            type="text"
            value={center.join(', ')}
            onChange={(e) => setCenter(e.target.value.split(',').map(coord => parseFloat(coord.trim())))}
            placeholder="28.6139, 77.2090"
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

        {/* Clear Button */}
        <button
          onClick={clearDrawings}
          className="w-full px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          🗑️ Clear All
        </button>

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
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Use the drawing tools on the right to draw your farm boundary
            </p>
            <p className="text-xs mt-1 opacity-90">
              Click the polygon tool, then click on the map to create points. Double-click to finish drawing.
            </p>
          </div>
          <div className="text-right text-xs">
            <p>Or enter coordinates manually</p>
          </div>
        </div>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
        Leaflet Map - Center: {center[0].toFixed(4)}°, {center[1].toFixed(4)}° | Zoom: {zoom}
      </div>
    </div>
  );
};

export default LeafletMap;