/**
 * Satellite Data Service
 * Handles data downloading and processing for various satellite sources
 */

class SatelliteDataService {
  constructor() {
    this.baseURL = 'https://api.example.com/satellite'; // Replace with actual API
    this.supportedSources = {
      'sentinel2': {
        name: 'Sentinel-2',
        resolution: '10-20m',
        revisit: '5 days',
        bands: ['B2', 'B3', 'B4', 'B8', 'B11', 'B12'],
        indices: ['NDVI', 'EVI', 'NDWI', 'NDBI', 'NBR']
      },
      'landsat8': {
        name: 'Landsat 8',
        resolution: '30m',
        revisit: '16 days',
        bands: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
        indices: ['NDVI', 'EVI', 'NDWI', 'NDBI', 'NBR']
      },
      'modis': {
        name: 'MODIS',
        resolution: '250m-1km',
        revisit: 'Daily',
        bands: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
        indices: ['NDVI', 'EVI', 'NDWI', 'NDBI']
      }
    };
  }

  /**
   * Calculate spectral indices
   */
  calculateIndices(imageData, indices) {
    const results = {};
    
    indices.forEach(index => {
      switch (index) {
        case 'NDVI':
          results.NDVI = this.calculateNDVI(imageData);
          break;
        case 'EVI':
          results.EVI = this.calculateEVI(imageData);
          break;
        case 'NDWI':
          results.NDWI = this.calculateNDWI(imageData);
          break;
        case 'NDBI':
          results.NDBI = this.calculateNDBI(imageData);
          break;
        case 'NBR':
          results.NBR = this.calculateNBR(imageData);
          break;
        case 'SAVI':
          results.SAVI = this.calculateSAVI(imageData);
          break;
        case 'RENDVI':
          results.RENDVI = this.calculateRENDVI(imageData);
          break;
        case 'MNDWI':
          results.MNDWI = this.calculateMNDWI(imageData);
          break;
        case 'NDMI':
          results.NDMI = this.calculateNDMI(imageData);
          break;
        case 'NMDI':
          results.NMDI = this.calculateNMDI(imageData);
          break;
        case 'BSI':
          results.BSI = this.calculateBSI(imageData);
          break;
        case 'NDTI':
          results.NDTI = this.calculateNDTI(imageData);
          break;
        case 'PSRI':
          results.PSRI = this.calculatePSRI(imageData);
          break;
        case 'CRI':
          results.CRI = this.calculateCRI(imageData);
          break;
        case 'IBI':
          results.IBI = this.calculateIBI(imageData);
          break;
        case 'BAEI':
          results.BAEI = this.calculateBAEI(imageData);
          break;
        case 'EBBI':
          results.EBBI = this.calculateEBBI(imageData);
          break;
        case 'dNBR':
          results.dNBR = this.calculatedNBR(imageData);
          break;
        case 'BAI':
          results.BAI = this.calculateBAI(imageData);
          break;
        case 'NDDI':
          results.NDDI = this.calculateNDDI(imageData);
          break;
        case 'CIred-edge':
          results['CIred-edge'] = this.calculateCIredEdge(imageData);
          break;
        case 'TGI':
          results.TGI = this.calculateTGI(imageData);
          break;
        case 'SI':
          results.SI = this.calculateSI(imageData);
          break;
        case 'NDSI':
          results.NDSI = this.calculateNDSI(imageData);
          break;
      }
    });
    
    return results;
  }

  // Spectral Index Calculations
  calculateNDVI(imageData) {
    const { NIR, Red } = imageData;
    return (NIR - Red) / (NIR + Red);
  }

  calculateEVI(imageData) {
    const { NIR, Red, Blue } = imageData;
    return 2.5 * ((NIR - Red) / (NIR + 6 * Red - 7.5 * Blue + 1));
  }

  calculateNDWI(imageData) {
    const { NIR, SWIR1 } = imageData;
    return (NIR - SWIR1) / (NIR + SWIR1);
  }

  calculateNDBI(imageData) {
    const { SWIR1, NIR } = imageData;
    return (SWIR1 - NIR) / (SWIR1 + NIR);
  }

  calculateNBR(imageData) {
    const { NIR, SWIR2 } = imageData;
    return (NIR - SWIR2) / (NIR + SWIR2);
  }

  calculateSAVI(imageData) {
    const { NIR, Red } = imageData;
    const L = 0.5; // Soil adjustment factor
    return ((NIR - Red) / (NIR + Red + L)) * (1 + L);
  }

  calculateRENDVI(imageData) {
    const { RedEdge, NIR } = imageData;
    return (NIR - RedEdge) / (NIR + RedEdge);
  }

  calculateMNDWI(imageData) {
    const { Green, SWIR1 } = imageData;
    return (Green - SWIR1) / (Green + SWIR1);
  }

  calculateNDMI(imageData) {
    const { NIR, SWIR1 } = imageData;
    return (NIR - SWIR1) / (NIR + SWIR1);
  }

  calculateNMDI(imageData) {
    const { NIR, SWIR1, SWIR2 } = imageData;
    return (NIR - (SWIR1 - SWIR2)) / (NIR + (SWIR1 - SWIR2));
  }

  calculateBSI(imageData) {
    const { Red, NIR, Blue, Green } = imageData;
    return ((Red + SWIR1) - (NIR + Blue)) / ((Red + SWIR1) + (NIR + Blue));
  }

  calculateNDTI(imageData) {
    const { SWIR1, SWIR2 } = imageData;
    return (SWIR1 - SWIR2) / (SWIR1 + SWIR2);
  }

  calculatePSRI(imageData) {
    const { Red, NIR, Blue } = imageData;
    return (Red - Blue) / NIR;
  }

  calculateCRI(imageData) {
    const { Red, Green } = imageData;
    return (1 / Red) - (1 / Green);
  }

  calculateIBI(imageData) {
    const { NIR, Red, Green, SWIR1 } = imageData;
    const NDBI = (SWIR1 - NIR) / (SWIR1 + NIR);
    const SAVI = ((NIR - Red) / (NIR + Red + 0.5)) * 1.5;
    return (2 * NDBI / (NDBI + SAVI)) - (SAVI / (NDBI + SAVI));
  }

  calculateBAEI(imageData) {
    const { NIR, Red, Green, SWIR1 } = imageData;
    return (NIR + Red) / (Green + SWIR1);
  }

  calculateEBBI(imageData) {
    const { NIR, Red, Green, SWIR1 } = imageData;
    return (NIR - Red) / (10 * Math.sqrt(NIR + Red + Green + SWIR1));
  }

  calculatedNBR(imageData) {
    const { NIR, SWIR2 } = imageData;
    return (NIR - SWIR2) / (NIR + SWIR2);
  }

  calculateBAI(imageData) {
    const { Red, NIR } = imageData;
    return 1 / Math.sqrt(Math.pow(0.1 - Red, 2) + Math.pow(0.06 - NIR, 2));
  }

  calculateNDDI(imageData) {
    const { NIR, Red, SWIR1 } = imageData;
    const NDVI = (NIR - Red) / (NIR + Red);
    const NDWI = (NIR - SWIR1) / (NIR + SWIR1);
    return NDVI - NDWI;
  }

  calculateCIredEdge(imageData) {
    const { NIR, RedEdge } = imageData;
    return (NIR / RedEdge) - 1;
  }

  calculateTGI(imageData) {
    const { Red, Green, Blue } = imageData;
    return -0.5 * (190 * (Red - Green) - 120 * (Red - Blue));
  }

  calculateSI(imageData) {
    const { Red, Green, Blue } = imageData;
    return (Red + Green + Blue) / 3;
  }

  calculateNDSI(imageData) {
    const { Green, SWIR1 } = imageData;
    return (Green - SWIR1) / (Green + SWIR1);
  }

  /**
   * Download satellite data for a given area and time range
   */
  async downloadData(area, dateRange, source = 'sentinel2', indices = []) {
    try {
      const requestData = {
        area: {
          type: area.type,
          coordinates: area.coordinates,
          bounds: area.bounds
        },
        dateRange: {
          start: dateRange.start,
          end: dateRange.end
        },
        source: source,
        indices: indices
      };

      // Simulate API call
      const response = await fetch(`${this.baseURL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };

    } catch (error) {
      console.error('Error downloading satellite data:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Process downloaded data and calculate indices
   */
  async processData(rawData, indices) {
    try {
      const processedData = {
        timeSeries: {},
        heatmaps: {},
        statistics: {}
      };

      // Calculate indices for each time step
      for (const timeStep of rawData.timeSteps) {
        const indexValues = this.calculateIndices(timeStep.imageData, indices);
        
        Object.keys(indexValues).forEach(index => {
          if (!processedData.timeSeries[index]) {
            processedData.timeSeries[index] = [];
          }
          processedData.timeSeries[index].push({
            date: timeStep.date,
            value: indexValues[index]
          });
        });
      }

      // Generate heatmaps for each index
      for (const index of indices) {
        processedData.heatmaps[index] = {
          url: `https://api.example.com/heatmap/${index}/${Date.now()}`,
          metadata: {
            min: Math.random() * 0.3,
            max: Math.random() * 0.7 + 0.3,
            mean: Math.random() * 0.5 + 0.25
          }
        };
      }

      // Calculate statistics
      processedData.statistics = {
        area: this.calculateArea(rawData.area),
        avgIndex: this.calculateAverageIndex(processedData.timeSeries),
        trend: this.calculateTrend(processedData.timeSeries),
        confidence: this.calculateConfidence(processedData.timeSeries)
      };

      return {
        success: true,
        data: processedData
      };

    } catch (error) {
      console.error('Error processing data:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  calculateArea(area) {
    // Simple area calculation (in practice, use proper geospatial calculations)
    if (area.bounds) {
      const latDiff = area.bounds.getNorthEast().lat - area.bounds.getSouthWest().lat;
      const lngDiff = area.bounds.getNorthEast().lng - area.bounds.getSouthWest().lng;
      const areaKm2 = latDiff * lngDiff * 111 * 111; // Rough conversion
      return `${areaKm2.toFixed(0)} km²`;
    }
    return 'Unknown area';
  }

  calculateAverageIndex(timeSeries) {
    const allValues = Object.values(timeSeries).flat().map(point => point.value);
    const average = allValues.reduce((sum, val) => sum + val, 0) / allValues.length;
    return average.toFixed(3);
  }

  calculateTrend(timeSeries) {
    // Simple trend calculation
    const trends = Object.values(timeSeries).map(series => {
      if (series.length < 2) return 0;
      const first = series[0].value;
      const last = series[series.length - 1].value;
      return ((last - first) / first) * 100;
    });
    
    const avgTrend = trends.reduce((sum, trend) => sum + trend, 0) / trends.length;
    return `${avgTrend > 0 ? '+' : ''}${avgTrend.toFixed(1)}%`;
  }

  calculateConfidence(timeSeries) {
    // Mock confidence calculation
    return `${Math.floor(Math.random() * 20 + 80)}%`;
  }

  /**
   * Get available data sources
   */
  getSupportedSources() {
    return this.supportedSources;
  }

  /**
   * Get supported indices for a data source
   */
  getSupportedIndices(source) {
    return this.supportedSources[source]?.indices || [];
  }
}

// Create and export singleton instance
export const satelliteDataService = new SatelliteDataService();
export default satelliteDataService;
