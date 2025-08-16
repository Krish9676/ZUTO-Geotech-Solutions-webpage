import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Comprehensive index data based on the remote sensing guide
const serviceIndices = {
  'vegetation-analysis': {
    title: 'Vegetation Analysis Services',
    description: 'Advanced vegetation health monitoring and crop assessment using state-of-the-art spectral indices.',
    indices: [
      {
        name: 'NDVI (Normalized Difference Vegetation Index)',
        formula: 'NDVI = (NIR - Red) / (NIR + Red)',
        sentinel2: 'NDVI = (B08 - B04) / (B08 + B04)',
        landsat: 'NDVI = (Band 5 - Band 4) / (Band 5 + Band 4)',
        description: 'Most widely used vegetation index for general vegetation health and biomass assessment.',
        applications: ['Crop monitoring', 'Yield prediction', 'Drought assessment', 'Environmental monitoring'],
        valueRange: '0.6 to 0.9 (healthy), 0.2 to 0.5 (moderate), 0.1 to 0.2 (sparse), 0 to 0.1 (bare soil)',
        advantages: ['Most validated index', 'Strong LAI correlation', 'Standardized values', 'Excellent discrimination'],
        limitations: ['Saturates at high biomass', 'Soil background sensitive', 'Atmospheric effects']
      },
      {
        name: 'EVI (Enhanced Vegetation Index)',
        formula: 'EVI = 2.5 × ((NIR - Red) / (NIR + 6×Red - 7.5×Blue + 1))',
        sentinel2: 'EVI = 2.5 × ((B08 - B04) / (B08 + 6×B04 - 7.5×B02 + 1))',
        landsat: 'EVI = 2.5 × ((Band 5 - Band 4) / (Band 5 + 6×Band 4 - 7.5×Band 2 + 1))',
        description: 'Advanced vegetation index that reduces atmospheric and soil background effects.',
        applications: ['Dense vegetation monitoring', 'High biomass areas', 'Atmospheric correction', 'P/K nutrient assessment'],
        valueRange: '-1 to +1 (healthy vegetation: 0.2 to 0.8)',
        advantages: ['Reduces atmospheric effects', 'Better dense vegetation performance', 'Enhanced dynamic range'],
        limitations: ['More complex calculation', 'Requires blue band', 'Computationally intensive']
      },
      {
        name: 'RENDVI (Red Edge NDVI) - Sentinel-2 Only',
        formula: 'RENDVI = (NIR - Red Edge) / (NIR + Red Edge)',
        sentinel2: 'RENDVI = (B08 - B05) / (B08 + B05)',
        landsat: 'Not available (no red edge bands)',
        description: 'Most sensitive index for nitrogen content and early stress detection.',
        applications: ['Direct nitrogen detection', 'Chlorophyll assessment', 'Early stress detection', 'Precision agriculture'],
        valueRange: '0.6 to 1.0 (healthy), 0.2 to 0.6 (moderate), -1.0 to 0.2 (poor health)',
        advantages: ['Most sensitive to nitrogen', 'Superior to NDVI', 'Early stress detection', 'Less saturation'],
        limitations: ['Sentinel-2 only', 'Reduced historical data', 'Higher resolution required']
      },
      {
        name: 'SAVI (Soil Adjusted Vegetation Index)',
        formula: 'SAVI = ((NIR - Red) / (NIR + Red + L)) × (1 + L)',
        sentinel2: 'SAVI = ((B08 - B04) / (B08 + B04 + L)) × (1 + L)',
        landsat: 'SAVI = ((Band 5 - Band 4) / (Band 5 + Band 4 + L)) × (1 + L)',
        description: 'Soil-adjusted vegetation index for areas with exposed soil surfaces.',
        applications: ['Young crop monitoring', 'Arid regions', 'Sparse vegetation', 'Soil brightness reduction'],
        valueRange: 'L=1 (no vegetation), L=0.5 (moderate), L=0 (high vegetation)',
        advantages: ['Reduces soil influence', 'Better sparse vegetation', 'Adjustable L-factor'],
        limitations: ['L-factor selection critical', 'More complex than NDVI', 'Parameter dependent']
      },
      {
        name: 'OSAVI (Optimized Soil Adjusted Vegetation Index)',
        formula: 'OSAVI = (NIR - Red) / (NIR + Red + 0.16)',
        sentinel2: 'OSAVI = (B08 - B04) / (B08 + B04 + 0.16)',
        landsat: 'OSAVI = (Band 5 - Band 4) / (Band 5 + Band 4 + 0.16)',
        description: 'Optimized soil-adjusted vegetation index for low-density vegetation monitoring.',
        applications: ['Low-density vegetation', 'Areas with visible soil', 'Nitrogen assessment', 'Early crop stages'],
        valueRange: 'Better sensitivity when canopy cover >50%',
        advantages: ['Optimized L-factor', 'Better sparse vegetation', 'Simplified calculation'],
        limitations: ['Fixed L-factor', 'Limited to specific conditions']
      },
      {
        name: 'GNDVI (Green NDVI)',
        formula: 'GNDVI = (NIR - Green) / (NIR + Green)',
        sentinel2: 'GNDVI = (B08 - B03) / (B08 + B03)',
        landsat: 'GNDVI = (Band 5 - Band 3) / (Band 5 + Band 3)',
        description: 'Green-based vegetation index for chlorophyll content assessment.',
        applications: ['Chlorophyll assessment', 'Nitrogen stress detection', 'Mid-season monitoring', 'Photosynthetic activity'],
        valueRange: 'Similar to NDVI but with green band',
        advantages: ['Better chlorophyll correlation', 'Mid-season sensitivity', 'Stress detection'],
        limitations: ['Similar limitations to NDVI', 'Green band dependent']
      },
      {
        name: 'PSRI (Plant Senescence Reflectance Index)',
        formula: 'PSRI = (Red - Green) / NIR',
        sentinel2: 'PSRI = (B04 - B03) / B08',
        landsat: 'PSRI = (Band 4 - Band 3) / Band 5',
        description: 'Plant senescence and crop maturity assessment index.',
        applications: ['Crop maturity assessment', 'Plant senescence detection', 'Fruit ripening monitoring', 'Harvest timing'],
        valueRange: '-0.1 to 0.2 (healthy), 0.2 to 0.4 (early senescence), >0.4 (advanced senescence)',
        advantages: ['Maturity specific', 'Harvest timing', 'Senescence detection'],
        limitations: ['Seasonal dependent', 'Crop specific']
      },
      {
        name: 'CRI (Carotenoid Reflectance Index) - Sentinel-2 Only',
        formula: 'CRI = (1/Green) - (1/Red Edge)',
        sentinel2: 'CRI = (1/B03) - (1/B05)',
        landsat: 'Not available (no red edge bands)',
        description: 'Carotenoid content estimation and early stress detection.',
        applications: ['Crop stress detection', 'Carotenoid content', 'Plant health assessment', 'Early stress indicator'],
        valueRange: 'Higher values indicate more carotenoids',
        advantages: ['Early stress detection', 'Carotenoid specific', 'Sentinel-2 advantage'],
        limitations: ['Sentinel-2 only', 'Complex calculation', 'Limited applications']
      }
    ]
  },
  'water-moisture-mapping': {
    title: 'Water & Moisture Mapping Services',
    description: 'Comprehensive water body detection, wetland mapping, and moisture stress assessment.',
    indices: [
      {
        name: 'NDWI (Normalized Difference Water Index)',
        formula: 'NDWI = (Green - NIR) / (Green + NIR)',
        sentinel2: 'NDWI = (B03 - B08) / (B03 + B08)',
        landsat: 'NDWI = (Band 3 - Band 5) / (Band 3 + Band 5)',
        description: 'Standard water body detection index for open water and wetland mapping.',
        applications: ['Open water detection', 'Wetland monitoring', 'Water quality assessment', 'Flood mapping'],
        valueRange: '>0.5 (water), 0.0 to 0.2 (flooding), -0.3 to 0.0 (drought), -1.0 to -0.3 (severe drought)',
        advantages: ['Simple calculation', 'Good water detection', 'Widely used'],
        limitations: ['Built-up area confusion', 'Urban noise', 'Mixed pixel issues']
      },
      {
        name: 'MNDWI (Modified Normalized Difference Water Index)',
        formula: 'MNDWI = (Green - SWIR) / (Green + SWIR)',
        sentinel2: 'MNDWI = (B03 - B11) / (B03 + B11)',
        landsat: 'MNDWI = (Band 3 - Band 6) / (Band 3 + Band 6)',
        description: 'Enhanced water index that reduces built-up area noise and improves accuracy.',
        applications: ['Urban water extraction', 'Built-up area suppression', 'Improved water detection', 'Soil moisture'],
        valueRange: 'Similar to NDWI but more accurate',
        advantages: ['Reduces urban noise', 'Better accuracy', 'Built-up area suppression'],
        limitations: ['SWIR band required', 'Slightly more complex']
      },
      {
        name: 'NDMI (Normalized Difference Moisture Index)',
        formula: 'NDMI = (NIR - SWIR) / (NIR + SWIR)',
        sentinel2: 'NDMI = (B08 - B11) / (B08 + B11)',
        landsat: 'NDMI = (Band 5 - Band 6) / (Band 5 + Band 6)',
        description: 'Vegetation water content monitoring and drought stress detection.',
        applications: ['Vegetation water content', 'Drought stress detection', 'Agricultural water management', 'Wildfire risk'],
        valueRange: '0.8 to 1.0 (full canopy), 0.6 to 0.8 (dense), 0.4 to 0.6 (moderate), 0.2 to 0.4 (average), 0.0 to 0.2 (sparse)',
        advantages: ['Water stress specific', 'Good drought detection', 'Agricultural focus'],
        limitations: ['Vegetation dependent', 'Seasonal variations']
      },
      {
        name: 'NMDI (Normalized Multi-band Drought Index)',
        formula: 'NMDI = (NIR - (SWIR1 - SWIR2)) / (NIR + (SWIR1 - SWIR2))',
        sentinel2: 'NMDI = (B08 - (B11 - B12)) / (B08 + (B11 - B12))',
        landsat: 'NMDI = (Band 5 - (Band 6 - Band 7)) / (Band 5 + (Band 6 - Band 7))',
        description: 'Multi-spectral drought monitoring and water stress assessment.',
        applications: ['Drought monitoring', 'Water stress assessment', 'Agricultural drought warning', 'Multi-spectral evaluation'],
        valueRange: 'Higher values indicate less drought stress',
        advantages: ['Multi-spectral approach', 'Drought specific', 'Early warning capability'],
        limitations: ['Multiple SWIR bands required', 'Complex calculation']
      },
      {
        name: 'MSI (Moisture Stress Index)',
        formula: 'MSI = SWIR / NIR',
        sentinel2: 'MSI = B11 / B08',
        landsat: 'MSI = Band 6 / Band 5',
        description: 'Simple moisture stress detection and vegetation water status monitoring.',
        applications: ['Vegetation water stress', 'Irrigation management', 'Crop water status', 'Simple moisture assessment'],
        valueRange: 'Lower values indicate less stress',
        advantages: ['Simple calculation', 'Water stress specific', 'Easy interpretation'],
        limitations: ['Basic approach', 'Limited sensitivity']
      },
      {
        name: 'NDDI (Normalized Difference Drought Index)',
        formula: 'NDDI = (NDVI - NDWI) / (NDVI + NDWI)',
        sentinel2: 'NDDI = (NDVI - NDWI) / (NDVI + NDWI)',
        landsat: 'NDDI = (NDVI - NDWI) / (NDVI + NDWI)',
        description: 'Combined vegetation-water stress analysis for comprehensive drought assessment.',
        applications: ['Drought severity assessment', 'Agricultural drought monitoring', 'Water stress evaluation', 'Combined analysis'],
        valueRange: 'Higher values indicate more drought stress',
        advantages: ['Combined approach', 'Comprehensive assessment', 'Drought severity'],
        limitations: ['Derived from other indices', 'Error propagation']
      }
    ]
  },
  'soil-agricultural-assessment': {
    title: 'Soil & Agricultural Assessment Services',
    description: 'Soil property mapping, tillage monitoring, and agricultural land classification.',
    indices: [
      {
        name: 'BSI (Bare Soil Index)',
        formula: 'BSI = ((SWIR + Red) - (NIR + Blue)) / ((SWIR + Red) + (NIR + Blue))',
        sentinel2: 'BSI = ((B11 + B04) - (B08 + B02)) / ((B11 + B04) + (B08 + B02))',
        landsat: 'BSI = ((Band 6 + Band 4) - (Band 5 + Band 2)) / ((Band 6 + Band 4) + (Band 5 + Band 2))',
        description: 'Bare soil identification and mapping for agricultural field preparation tracking.',
        applications: ['Bare soil mapping', 'Soil erosion risk', 'Field preparation', 'Land use classification'],
        valueRange: 'Higher values indicate more bare soil',
        advantages: ['Good soil detection', 'Agricultural focus', 'Erosion assessment'],
        limitations: ['Seasonal variations', 'Vegetation interference']
      },
      {
        name: 'NDTI (Normalized Difference Tillage Index)',
        formula: 'NDTI = (SWIR1 - SWIR2) / (SWIR1 + SWIR2)',
        sentinel2: 'NDTI = (B11 - B12) / (B11 + B12)',
        landsat: 'NDTI = (Band 6 - Band 7) / (Band 6 + Band 7)',
        description: 'Crop residue cover assessment and tillage practice monitoring.',
        applications: ['Crop residue cover', 'Tillage monitoring', 'Soil conservation', 'Conservation agriculture'],
        valueRange: 'Higher values indicate more residue',
        advantages: ['Tillage specific', 'Residue detection', 'Conservation focus'],
        limitations: ['SWIR bands required', 'Limited applications']
      },
      {
        name: 'PSRI (Plant Senescence Reflectance Index)',
        formula: 'PSRI = (Red - Green) / NIR',
        sentinel2: 'PSRI = (B04 - B03) / B08',
        landsat: 'PSRI = (Band 4 - Band 3) / Band 5',
        description: 'Crop maturity assessment and plant senescence detection.',
        applications: ['Crop maturity assessment', 'Plant senescence detection', 'Fruit ripening monitoring', 'Harvest timing optimization'],
        valueRange: '-0.1 to 0.2 (healthy green vegetation), 0.2 to 0.4 (early senescence), >0.4 (advanced senescence)',
        advantages: ['Maturity specific', 'Harvest timing', 'Senescence detection'],
        limitations: ['Seasonal dependent', 'Crop specific']
      },
      {
        name: 'CRI (Carotenoid Reflectance Index) - Sentinel-2 Only',
        formula: 'CRI = (1/Green) - (1/Red Edge)',
        sentinel2: 'CRI = (1/B03) - (1/B05)',
        landsat: 'Not available (no red edge bands)',
        description: 'Crop stress detection and carotenoid content estimation.',
        applications: ['Crop stress detection', 'Carotenoid content estimation', 'Plant health assessment', 'Early stress indicator'],
        valueRange: 'Higher values indicate more carotenoids',
        advantages: ['Early stress detection', 'Carotenoid specific', 'Sentinel-2 advantage'],
        limitations: ['Sentinel-2 only', 'Complex calculation', 'Limited applications']
      },
      {
        name: 'CMR (Clay Minerals Ratio) - Sentinel-2 Only',
        formula: 'CMR = SWIR1 / SWIR2',
        sentinel2: 'CMR = B11 / B12',
        landsat: 'CMR = Band 6 / Band 7',
        description: 'Clay content estimation and CEC assessment.',
        applications: ['Clay content estimation', 'CEC assessment', 'Nutrient retention capacity', 'Soil texture mapping'],
        valueRange: 'Higher values indicate more clay content',
        advantages: ['Clay specific', 'CEC correlation', 'Nutrient retention'],
        limitations: ['SWIR bands required', 'Soil dependent', 'Calibration needed']
      },
      {
        name: 'CAI (Cellulose Absorption Index) - Sentinel-2 Only',
        formula: 'CAI = 0.5×(SWIR1+SWIR2) - SWIR2',
        sentinel2: 'CAI = 0.5×(B11+B12) - B12',
        landsat: 'CAI = 0.5×(Band 6+Band 7) - Band 7',
        description: 'Organic matter content estimation and SOM mapping.',
        applications: ['Organic matter estimation', 'SOM mapping', 'Nutrient cycling assessment', 'Carbon sequestration studies'],
        valueRange: 'Higher values indicate more organic matter',
        advantages: ['Organic matter specific', 'SOM correlation', 'Carbon assessment'],
        limitations: ['SWIR bands required', 'Complex calculation', 'Limited validation']
      },
      {
        name: 'IOR (Iron Oxide Ratio)',
        formula: 'IOR = Red / Blue',
        sentinel2: 'IOR = B04 / B02',
        landsat: 'IOR = Band 4 / Band 2',
        description: 'Iron content assessment and soil pH estimation.',
        applications: ['Iron content assessment', 'Soil pH estimation', 'Nutrient solubility evaluation', 'Soil color characterization'],
        valueRange: 'Higher values indicate more iron oxides',
        advantages: ['Iron specific', 'pH correlation', 'Simple calculation'],
        limitations: ['Basic approach', 'Limited sensitivity', 'Soil dependent']
      }
    ]
  },
  'urban-builtup-mapping': {
    title: 'Urban & Built-up Mapping Services',
    description: 'Urban expansion monitoring, built-up area extraction, and infrastructure development tracking.',
    indices: [
      {
        name: 'NDBI (Normalized Difference Built-up Index)',
        formula: 'NDBI = (SWIR - NIR) / (SWIR + NIR)',
        sentinel2: 'NDBI = (B11 - B08) / (B11 + B08)',
        landsat: 'NDBI = (Band 6 - Band 5) / (Band 6 + Band 5)',
        description: 'Built-up area extraction and urban expansion monitoring.',
        applications: ['Built-up extraction', 'Urban expansion', 'LULC classification', 'Infrastructure tracking'],
        valueRange: 'Higher values indicate more built-up areas',
        advantages: ['Simple calculation', 'Good urban detection', 'Widely used'],
        limitations: ['Water confusion', 'Mixed pixel issues', 'Seasonal variations']
      },
      {
        name: 'IBI (Index-based Built-up Index)',
        formula: 'IBI = (2×SWIR/(SWIR+NIR) - (NIR/(NIR+Red) + Green/(Green+SWIR))) / (2×SWIR/(SWIR+NIR) + (NIR/(NIR+Red) + Green/(Green+SWIR)))',
        sentinel2: 'IBI = (2×B11/(B11+B08) - (B08/(B08+B04) + B03/(B03+B11))) / (2×B11/(B11+B08) + (B08/(B08+B04) + B03/(B03+B11)))',
        landsat: 'IBI = (2×Band 6/(Band 6+Band 5) - (Band 5/(Band 5+Band 4) + Band 3/(Band 3+Band 6))) / (2×Band 6/(Band 6+Band 5) + (Band 5/(Band 5+Band 4) + Band 3/(Band 3+Band 6)))',
        description: 'Comprehensive built-up mapping with enhanced accuracy.',
        applications: ['Comprehensive mapping', 'Urban density', 'City planning', 'Complex environments'],
        valueRange: 'Higher values indicate more built-up areas',
        advantages: ['Better accuracy', 'Comprehensive approach', 'Urban density assessment'],
        limitations: ['Complex calculation', 'Computationally intensive', 'Multiple bands required']
      },
      {
        name: 'BAEI (Built-up Area Extraction Index)',
        formula: 'BAEI = (Red + 0.3) / (Green + SWIR)',
        sentinel2: 'BAEI = (B04 + 0.3) / (B03 + B11)',
        landsat: 'BAEI = (Band 4 + 0.3) / (Band 3 + Band 6)',
        description: 'Enhanced built-up extraction and urban boundary delineation.',
        applications: ['Enhanced built-up extraction', 'Urban boundary delineation', 'Construction monitoring', 'Mixed urban-rural mapping'],
        valueRange: 'Higher values indicate more built-up areas',
        advantages: ['Enhanced extraction', 'Boundary delineation', 'Construction monitoring'],
        limitations: ['Parameter dependent', 'Limited validation', 'Complex calculation']
      },
      {
        name: 'EBBI (Enhanced Built-up and Bareness Index)',
        formula: 'EBBI = (SWIR - NIR) / (10 × sqrt(SWIR + Red))',
        sentinel2: 'EBBI = (B11 - B08) / (10 × sqrt(B11 + B04))',
        landsat: 'EBBI = (Band 6 - Band 5) / (10 × sqrt(Band 6 + Band 4))',
        description: 'Combined built-up and bare soil mapping for comprehensive surface analysis.',
        applications: ['Combined mapping', 'LULC multi-class classification', 'Land cover change detection', 'Comprehensive surface mapping'],
        valueRange: 'Higher values indicate more built-up areas',
        advantages: ['Combined approach', 'Multi-class classification', 'Change detection'],
        limitations: ['Complex calculation', 'Parameter dependent', 'Limited applications']
      }
    ]
  },
  'hazard-fire-assessment': {
    title: 'Hazard & Fire Assessment Services',
    description: 'Fire severity mapping, burned area assessment, and post-fire recovery monitoring.',
    indices: [
      {
        name: 'NBR (Normalized Burn Ratio)',
        formula: 'NBR = (NIR - SWIR2) / (NIR + SWIR2)',
        sentinel2: 'NBR = (B08 - B12) / (B08 + B12)',
        landsat: 'NBR = (Band 5 - Band 7) / (Band 5 + Band 7)',
        description: 'Fire severity assessment and burned area mapping.',
        applications: ['Fire severity', 'Burned area mapping', 'Post-fire recovery', 'Fire damage evaluation'],
        valueRange: 'Lower values indicate more severe burning',
        advantages: ['Fire specific', 'Severity assessment', 'Recovery monitoring'],
        limitations: ['Pre-fire data required', 'Seasonal variations', 'Vegetation dependent']
      },
      {
        name: 'dNBR (Differenced Normalized Burn Ratio)',
        formula: 'dNBR = NBR_pre-fire - NBR_post-fire',
        sentinel2: 'dNBR = NBR_pre-fire - NBR_post-fire',
        landsat: 'dNBR = NBR_pre-fire - NBR_post-fire',
        description: 'Fire severity classification and burn severity mapping.',
        applications: ['Fire severity classification', 'Burn severity mapping', 'Fire impact assessment', 'Recovery monitoring'],
        valueRange: '<0.1 (unburned), 0.1-0.27 (low), 0.27-0.44 (moderate-low), 0.44-0.66 (moderate-high), ≥0.66 (high)',
        advantages: ['Severity classification', 'Change detection', 'Impact assessment'],
        limitations: ['Two-date requirement', 'Atmospheric correction critical', 'Temporal consistency needed']
      },
      {
        name: 'BAI (Burn Area Index)',
        formula: 'BAI = 1 / ((0.1 - Red)² + (0.06 - NIR)²)',
        sentinel2: 'BAI = 1 / ((0.1 - B04)² + (0.06 - B08)²)',
        landsat: 'BAI = 1 / ((0.1 - Band 4)² + (0.06 - Band 5)²)',
        description: 'Burned area enhancement and fire scar detection.',
        applications: ['Burned area enhancement', 'Fire scar detection', 'Post-fire area assessment', 'Historical fire mapping'],
        valueRange: 'Higher values indicate more burned areas',
        advantages: ['Burned area specific', 'Fire scar detection', 'Historical mapping'],
        limitations: ['Parameter dependent', 'Limited validation', 'Complex calculation']
      },
      {
        name: 'NDDI (Normalized Difference Drought Index)',
        formula: 'NDDI = (NDVI - NDWI) / (NDVI + NDWI)',
        sentinel2: 'NDDI = (NDVI - NDWI) / (NDVI + NDWI)',
        landsat: 'NDDI = (NDVI - NDWI) / (NDVI + NDWI)',
        description: 'Drought severity assessment and agricultural drought monitoring.',
        applications: ['Drought severity assessment', 'Agricultural drought monitoring', 'Water stress evaluation', 'Combined vegetation-water stress analysis'],
        valueRange: 'Higher values indicate more drought stress',
        advantages: ['Combined approach', 'Comprehensive assessment', 'Drought severity'],
        limitations: ['Derived from other indices', 'Error propagation', 'Limited applications']
      }
    ]
  },
  'nutrient-fertility-analysis': {
    title: 'Nutrient & Fertility Analysis Services',
    description: 'Advanced nutrient deficiency detection, chlorophyll estimation, and soil fertility assessment.',
    indices: [
      {
        name: 'CIred-edge (Chlorophyll Index Red Edge) - Sentinel-2 Only',
        formula: 'CIred-edge = (NIR / Red Edge) - 1',
        sentinel2: 'CIred-edge = (B08 / B05) - 1',
        landsat: 'Not available (no red edge bands)',
        description: 'Direct chlorophyll estimation and nitrogen deficiency assessment.',
        applications: ['Direct chlorophyll estimation', 'Nitrogen deficiency', 'Precision fertilizer', 'Plant physiology'],
        valueRange: 'Higher values indicate more chlorophyll',
        advantages: ['Direct chlorophyll correlation', 'Nitrogen specific', 'Precision agriculture', 'Early detection'],
        limitations: ['Sentinel-2 only', 'Red edge dependent', 'Limited historical data'],
        impactLevel: 'VERY HIGH - Critical for nitrogen management'
      },
      {
        name: 'TGI (Triangle Greenness Index)',
        formula: 'TGI = Green - 0.39×Red - 0.61×Blue',
        sentinel2: 'TGI = B03 - 0.39×B04 - 0.61×B02',
        landsat: 'TGI = Band 3 - 0.39×Band 4 - 0.61×Band 2',
        description: 'Early nitrogen stress detection and pre-symptom stress identification.',
        applications: ['Early nitrogen stress', 'Pre-symptom detection', 'Early warning system', 'Precision monitoring'],
        valueRange: 'Higher values indicate better health',
        advantages: ['Early stress detection', 'Pre-symptom identification', 'Warning system'],
        limitations: ['Multi-band dependent', 'Complex calculation', 'Calibration needed']
      },
      {
        name: 'SI (Salinity Index)',
        formula: 'SI = sqrt(Blue × Red)',
        sentinel2: 'SI = sqrt(B02 × B04)',
        landsat: 'SI = sqrt(Band 2 × Band 4)',
        description: 'Soil salinity assessment and electrical conductivity correlation.',
        applications: ['Soil salinity assessment', 'Salt-affected mapping', 'Nutrient availability', 'EC correlation'],
        valueRange: 'Higher values indicate higher salinity',
        advantages: ['Salinity specific', 'EC correlation', 'Simple calculation', 'Widely applicable'],
        limitations: ['Soil dependent', 'Moisture influence', 'Seasonal variations'],
        impactLevel: 'VERY HIGH - Essential for salinity management'
      },
      {
        name: 'NDSI (Normalized Difference Salinity Index)',
        formula: 'NDSI = (Red - NIR) / (Red + NIR)',
        sentinel2: 'NDSI = (B04 - B08) / (B04 + B08)',
        landsat: 'NDSI = (Band 4 - Band 5) / (Band 4 + Band 5)',
        description: 'Salt deposit identification and saline soil mapping.',
        applications: ['Salt deposit identification', 'Saline soil mapping', 'Soil chemistry assessment', 'Salt stress monitoring'],
        valueRange: 'Higher values indicate more saline conditions',
        advantages: ['Salinity specific', 'Salt deposit detection', 'Simple calculation'],
        limitations: ['Basic approach', 'Limited sensitivity', 'Soil dependent']
      },
      {
        name: 'CAI (Cellulose Absorption Index) - Sentinel-2 Only',
        formula: 'CAI = 0.5×(SWIR1+SWIR2) - SWIR2',
        sentinel2: 'CAI = 0.5×(B11+B12) - B12',
        landsat: 'CAI = 0.5×(Band 6+Band 7) - Band 7',
        description: 'Organic matter content estimation and SOM mapping.',
        applications: ['Organic matter estimation', 'SOM mapping', 'Nutrient cycling assessment', 'Carbon sequestration studies'],
        valueRange: 'Higher values indicate more organic matter',
        advantages: ['Organic matter specific', 'SOM correlation', 'Carbon assessment'],
        limitations: ['SWIR bands required', 'Complex calculation', 'Limited validation']
      },
      {
        name: 'MSR (Modified Simple Ratio)',
        formula: 'MSR = (NIR/Red - 1) / sqrt(NIR/Red + 1)',
        sentinel2: 'MSR = (B08/B04 - 1) / sqrt(B08/B04 + 1)',
        landsat: 'MSR = (Band 5/Band 4 - 1) / sqrt(Band 5/Band 4 + 1)',
        description: 'P/K status correlation and overall plant health assessment.',
        applications: ['P/K status correlation', 'Overall plant health', 'LAI relationship analysis', 'Dense vegetation monitoring'],
        valueRange: 'Higher values indicate better health',
        advantages: ['P/K correlation', 'Health assessment', 'LAI relationship'],
        limitations: ['Complex calculation', 'Limited validation', 'Crop specific']
      }
    ]
  }
};

const GISServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  const service = serviceIndices[serviceId];

  useEffect(() => {
    if (!service) {
      navigate('/');
    }
  }, [service, navigate]);

  if (!service) {
    return null;
  }

  const toggleIndex = (indexName) => {
    setExpandedIndex(expandedIndex === indexName ? null : indexName);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-3 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{service.description}</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg text-sm">
                <span className="font-semibold">50+ Spectral Indices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {service.indices.map((index, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Index Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleIndex(index.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {index.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{index.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {index.impactLevel && (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium rounded-full">
                        {index.impactLevel}
                      </span>
                    )}
                    <svg
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        expandedIndex === index.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedIndex === index.name && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  {/* Formula Section */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">General Formula</h4>
                      <code className="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded block font-mono">
                        {index.formula}
                      </code>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Sentinel-2 Implementation</h4>
                      <code className="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded block font-mono">
                        {index.sentinel2}
                      </code>
                    </div>
                  </div>

                  {index.landsat !== 'Not available (no red edge bands)' && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Landsat 8/9 Implementation</h4>
                      <code className="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded block font-mono">
                        {index.landsat}
                      </code>
                    </div>
                  )}

                  {/* Applications */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Applications</h4>
                    <div className="flex flex-wrap gap-2">
                      {index.applications.map((app, appIdx) => (
                        <span
                          key={appIdx}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Value Range */}
                  {index.valueRange && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Value Interpretation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{index.valueRange}</p>
                    </div>
                  )}

                  {/* Advantages and Limitations */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 text-sm">Advantages</h4>
                      <ul className="space-y-1">
                        {index.advantages.map((adv, advIdx) => (
                          <li key={advIdx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 text-sm">Limitations</h4>
                      <ul className="space-y-1">
                        {index.limitations.map((lim, limIdx) => (
                          <li key={limIdx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {lim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Ready to Implement These Indices?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Access our dashboard to start processing satellite imagery with these advanced spectral indices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Access Dashboard
              </button>
              <button
                onClick={() => navigate('/')}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors text-sm hover:border-gray-400 dark:hover:border-gray-500"
              >
                Explore More Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISServiceDetail;
