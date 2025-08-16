# Comprehensive Remote Sensing Indices Guide for Satellite Applications

## Table of Contents
1. [Introduction](#introduction)
2. [Satellite Band References](#satellite-band-references)
3. [Vegetation Indices](#vegetation-indices)
4. [Water and Moisture Indices](#water-and-moisture-indices)
5. [Soil and Agricultural Indices](#soil-and-agricultural-indices)
6. [Urban and Built-up Area Indices](#urban-and-built-up-area-indices)
7. [Hazard and Fire Indices](#hazard-and-fire-indices)
8. [Specialized Nutrient and Fertility Indices](#specialized-nutrient-and-fertility-indices)
9. [Implementation Guidelines](#implementation-guidelines)
10. [Quick Reference Tables](#quick-reference-tables)

---

## Introduction

Remote sensing indices are mathematical combinations of satellite spectral bands that highlight specific features or conditions on Earth's surface. This comprehensive guide covers the most important indices used with **Sentinel-2** and **Landsat 8/9** satellites, providing formulas, applications, advantages, and practical implementation guidelines.

**Key Advantage:** Sentinel-2's red edge bands (B05, B06, B07) provide critical capabilities for direct nitrogen detection and advanced vegetation analysis that are not available with Landsat sensors.

---

## Satellite Band References

### Sentinel-2 MSI Bands

| Band | Wavelength (nm) | Resolution (m) | Description | Primary Applications |
|------|----------------|----------------|-------------|---------------------|
| B01  | 443            | 60             | Coastal aerosol | Atmospheric correction |
| B02  | 490            | 10             | Blue | Soil properties, water bodies |
| B03  | 560            | 10             | Green | Chlorophyll assessment |
| B04  | 665            | 10             | Red | Chlorophyll absorption |
| B05  | 705            | 20             | **Red Edge 1** | **Nitrogen detection** |
| B06  | 740            | 20             | **Red Edge 2** | **Vegetation stress** |
| B07  | 783            | 20             | **Red Edge 3** | **Leaf area index** |
| B08  | 842            | 10             | NIR | Biomass, vegetation vigor |
| B8A  | 865            | 20             | Narrow NIR | Precise biomass |
| B09  | 945            | 60             | Water vapor | Atmospheric correction |
| B10  | 1375           | 60             | SWIR/Cirrus | Cloud detection |
| B11  | 1610           | 20             | SWIR 1 | **Soil minerals, moisture** |
| B12  | 2190           | 20             | SWIR 2 | **Soil composition, organic matter** |

### Landsat 8/9 OLI Bands

| Band | Wavelength (nm) | Resolution (m) | Description | Primary Applications |
|------|----------------|----------------|-------------|---------------------|
| Band 1 | 443            | 30             | Coastal aerosol | Atmospheric correction |
| Band 2 | 482            | 30             | Blue | Soil properties, water |
| Band 3 | 561            | 30             | Green | Vegetation health |
| Band 4 | 655            | 30             | Red | Chlorophyll absorption |
| Band 5 | 865            | 30             | NIR | Vegetation biomass |
| Band 6 | 1609           | 30             | SWIR 1 | Soil minerals, moisture |
| Band 7 | 2201           | 30             | SWIR 2 | Soil composition |
| Band 8 | 590            | 15             | Panchromatic | High-resolution imaging |
| Band 9 | 1373           | 30             | Cirrus | Cloud detection |

---

Vegetation Analysis Indices
1. Normalized Difference Vegetation Index (NDVI)
Formula:

Sentinel-2: NDVI = (B08 - B04) / (B08 + B04)
Landsat 8/9: NDVI = (Band 5 - Band 4) / (Band 5 + Band 4)

Applications:

General vegetation health and biomass assessment
Crop monitoring and yield prediction
Drought assessment and environmental monitoring
Long-term vegetation change detection

Value Interpretation:

Dense, healthy vegetation: 0.6 to 0.9
Moderate vegetation: 0.2 to 0.5
Sparse vegetation: 0.1 to 0.2
Bare soil: 0 to 0.1
Water bodies: -0.25 to 0

Advantages:

Most widely used and validated vegetation index
Strong correlation with leaf area index (LAI)
Excellent for vegetation/non-vegetation discrimination
Standardized values ranging from -1 to +1

Limitations:

Saturates at high biomass levels
Sensitive to soil background and atmospheric effects

2. Enhanced Vegetation Index (EVI)
Formula:

Sentinel-2: EVI = 2.5 × ((B08 - B04) / (B08 + 6×B04 - 7.5×B02 + 1))
Landsat 8/9: EVI = 2.5 × ((Band 5 - Band 4) / (Band 5 + 6×Band 4 - 7.5×Band 2 + 1))

Applications:

Dense vegetation monitoring (rainforests, mature crops)
Areas with high biomass where NDVI saturates
Atmospheric noise correction
P/K nutrient status assessment

Advantages:

Reduces atmospheric and soil background effects
Better performance in dense vegetation
More sensitive to canopy structural variations
Enhanced dynamic range compared to NDVI

Value Range: -1 to +1 (healthy vegetation: 0.2 to 0.8)
3. Soil Adjusted Vegetation Index (SAVI)
Formula:

Sentinel-2: SAVI = ((B08 - B04) / (B08 + B04 + L)) × (1 + L)
Landsat 8/9: SAVI = ((Band 5 - Band 4) / (Band 5 + Band 4 + L)) × (1 + L)

L-factor values:

L = 1: No green vegetation cover
L = 0.5: Moderate vegetation cover (most commonly used)
L = 0: High vegetation cover (equivalent to NDVI)

Applications:

Young crop monitoring in early growth stages
Arid regions with sparse vegetation (<15% cover)
Areas with exposed soil surfaces
Reducing soil brightness influence

4. Optimized Soil Adjusted VI (OSAVI)
Formula:

Sentinel-2: OSAVI = (B08 - B04) / (B08 + B04 + 0.16)
Landsat 8/9: OSAVI = (Band 5 - Band 4) / (Band 5 + Band 4 + 0.16)

Applications:

Low-density vegetation monitoring
Areas with visible soil through canopy
Better sensitivity when canopy cover >50%
Nitrogen assessment in early crop stages

5. Atmospherically Resistant VI (ARVI)
Formula:

Sentinel-2: ARVI = (B08 - (2 * B04 - B02)) / (B08 + (2 * B04 + B02))
Landsat 8/9: ARVI = (Band 5 - (2 * Band 4 - Band 2)) / (Band 5 + (2 * Band 4 + Band 2))

Applications:

Improved vegetation mapping in high-aerosol environments
Suitable for areas with heavy dust/haze
Aerosol/relief insensitivity

6. Modified SAVI (MSAVI)
Formula:

Sentinel-2: MSAVI = 0.5 * (2*B08 + 1 - sqrt((2*B08 + 1)² - 8*(B08 - B04)))
Landsat 8/9: MSAVI = 0.5 * (2*Band 5 + 1 - sqrt((2*Band 5 + 1)² - 8*(Band 5 - Band 4)))

Applications:

Effective for very sparse vegetation and bare soil
Early growth, minimal soil effect

7. Green NDVI (GNDVI)
Formula:

Sentinel-2: GNDVI = (B08 - B03) / (B08 + B03)
Landsat 8/9: GNDVI = (Band 5 - Band 3) / (Band 5 + Band 3)

Applications:

Chlorophyll content assessment
Nitrogen stress detection (indirect)
Mid-season crop monitoring
Photosynthetic activity evaluation

8. Red Edge NDVI (RENDVI/NDRE) - Sentinel-2 Only
Formula: RENDVI = (B08 - B05) / (B08 + B05)
Applications:

Direct nitrogen deficiency detection
Chlorophyll content assessment
Early stress detection
Precision agriculture applications

Impact Level: VERY HIGH – Most important for nutrient analysis
Advantages:

Most sensitive to nitrogen changes
Direct red edge sensitivity
Superior to standard NDVI for agricultural applications

9. Modified Chlorophyll Absorption in Reflectance Index (MCARI705) - Sentinel-2 Only
Formula: MCARI705 = ((B06 - B05) - 0.2 * (B06 - B03)) * (B06 / B05)
Applications:

Sensitive to leaf chlorophyll and N deficiency
Crop vigor assessment
Disease stress mapping

10. Transformed Chlorophyll Absorption Ratio Index (TCARI) - Sentinel-2 Only
Formula: TCARI = 3 * ((B05 - B04) - 0.2 * (B05 - B03)) * (B05 / B04)
Applications:

Advanced nitrogen and chlorophyll detection
Used with OSAVI for improved accuracy

11. Triangular Vegetation Index (TVI)
Formula:

Sentinel-2: TVI = sqrt((B08 - B04) / (B08 + B04) + 0.5)
Landsat 8/9: TVI = sqrt((Band 5 - Band 4) / (Band 5 + Band 4) + 0.5)

Applications:

Canopy structure and health characterization
LAI modeling

12. S2REP – Sentinel-2 Red Edge Position
Formula: Complex algorithm using B05, B06, B07, B04 (see ESA documentation)
Applications:

Red edge position indication
Nitrogen and pigment content assessment
Sentinel-2 only

13. Plant Senescence Reflectance Index (PSRI)
Formula:

Sentinel-2: PSRI = (B04 - B03) / B08
Landsat 8/9: PSRI = (Band 4 - Band 3) / Band 5

Applications:

Crop maturity assessment
Plant senescence detection
Early harvest timing optimization

Value Interpretation:

Healthy green vegetation: -0.1 to 0.2
Early senescence: 0.2 to 0.4
Advanced senescence: >0.4

14. Visible Atmospherically Resistant Index (VARI)
Formula:

Sentinel-2: VARI = (B03 - B04) / (B03 + B04 - B02)
Landsat 8/9: VARI = (Band 3 - Band 4) / (Band 3 + Band 4 - Band 2)

Applications:

Simple vegetation analysis from RGB imagery
Robust against atmospheric correction

15. Leaf Area Index (LAI)
Formula: Sensor- and crop-specific; derived from NDVI/EVI models
Applications:

Canopy structure analysis
Key for crop modeling, photosynthesis assessment

16. Simple Ratio (SR)
Formula:

Sentinel-2: SR = B08 / B04
Landsat 8/9: SR = Band 5 / Band 4

Applications:

Biomass estimation
Nitrogen correlation
Dense vegetation analysis


Water and Moisture Indices
1. Normalized Difference Water Index (NDWI)
Formula:

Sentinel-2: NDWI = (B03 - B08) / (B03 + B08)
Landsat 8/9: NDWI = (Band 3 - Band 5) / (Band 3 + Band 5)

Applications:

Open water body detection and mapping
Wetland monitoring and delineation
Water quality assessment
Flood extent mapping

Advantages:

Simple, effective for water detection
Good for general water mapping

Limitations:

May confuse with built-up areas

2. Modified NDWI (MNDWI)
Formula:

Sentinel-2: MNDWI = (B03 - B11) / (B03 + B11)
Landsat 8/9: MNDWI = (Band 3 - Band 6) / (Band 3 + Band 6)

Applications:

Water body extraction in urban areas
Better built-up area noise suppression
Improved water detection accuracy
Soil moisture in arid regions

Advantages:

More accurate than NDWI for water extraction
Reduces built-up area confusion

3. Normalized Difference Moisture Index (NDMI/LSWI)
Formula:

Sentinel-2: NDMI = (B08 - B11) / (B08 + B11)
Landsat 8/9: NDMI = (Band 5 - Band 6) / (Band 5 + Band 6)

Applications:

Vegetation water content monitoring
Drought stress detection in crops
Agricultural water management
Wildfire risk assessment

Advantages:

Sensitive to vegetation water stress
Good for agricultural monitoring

4. Moisture Stress Index (MSI)
Formula:

Sentinel-2: MSI = B11 / B08
Landsat 8/9: MSI = Band 6 / Band 5

Applications:

Vegetation water stress detection
Irrigation management
Crop water status monitoring

Advantages:

Simple ratio for moisture stress
Direct relationship with plant water content

5. Water Ratio Index (WRI)
Formula:

Sentinel-2: WRI = (B03 + B04) / (B08 + B11)
Landsat 8/9: WRI = (Band 3 + Band 4) / (Band 5 + Band 6)

Applications:

Water detection and discrimination
Flood and soil moisture detection

6. Normalized Multi-band Drought Index (NMDI)
Formula:

Sentinel-2: NMDI = (B08 - (B11 - B12)) / (B08 + (B11 - B12))
Landsat 8/9: NMDI = (Band 5 - (Band 6 - Band 7)) / (Band 5 + (Band 6 - Band 7))

Applications:

Drought monitoring
Water stress assessment
Agricultural drought early warning

Advantages:

Combines multiple moisture indicators
Effective for drought assessment

7. Automated Water Extraction Index (AWEI)
Formula:

Sentinel-2: AWEI = 4*(B03 - B08) - (0.25*B11 + 2.75*B02)
Landsat 8/9: AWEI = 4*(Band 3 - Band 5) - (0.25*Band 6 + 2.75*Band 2)

Applications:

Automated large-scale waterbody mapping
Urban area water discrimination


Soil and Agricultural Indices
1. Bare Soil Index (BSI)
Formula:

Sentinel-2: BSI = ((B11 + B04) - (B08 + B02)) / ((B11 + B04) + (B08 + B02))
Landsat 8/9: BSI = ((Band 6 + Band 4) - (Band 5 + Band 2)) / ((Band 6 + Band 4) + (Band 5 + Band 2))

Applications:

Bare soil identification and mapping
Soil erosion risk evaluation
Agricultural field preparation tracking
Land degradation assessment

Advantages:

Effective for identifying exposed soil
Good for erosion monitoring

Best Conditions:

Non-vegetated areas
Post-harvest fields

2. Normalized Difference Tillage Index (NDTI)
Formula:

Sentinel-2: NDTI = (B11 - B12) / (B11 + B12)
Landsat 8/9: NDTI = (Band 6 - Band 7) / (Band 6 + Band 7)

Applications:

Crop residue cover assessment
Tillage practices monitoring
Soil conservation evaluation
Conservation agriculture monitoring

Advantages:

Indicates tillage practices and residue management
Important for soil health assessment

Best Conditions:

Post-harvest, pre-planting periods

3. Salinity Index (SI) - Tier 1 Priority
Formula:

Sentinel-2: SI = sqrt(B02 * B04)
Landsat 8/9: SI = sqrt(Band 2 * Band 4)

Applications:

Soil salinity assessment (EC)
Salt-affected soil mapping
Nutrient availability evaluation

Advantages:

Direct correlation with electrical conductivity
Essential for soil chemistry assessment

Impact Level: VERY HIGH
4. Normalized Difference Salinity Index (NDSI)
Formula:

Sentinel-2: NDSI = (B04 - B08) / (B04 + B08)
Landsat 8/9: NDSI = (Band 4 - Band 5) / (Band 4 + Band 5)

Applications:

Salt deposit identification
Saline soil mapping
Soil chemistry and salt stress monitoring

Advantages:

Normalized index for salt detection
Good for comparative studies

Impact Level: VERY HIGH
5. Clay Minerals Ratio (CMR) - Tier 2 Priority
Formula:

Sentinel-2: CMR = B11 / B12
Landsat 8/9: CMR = Band 6 / Band 7

Applications:

Clay content and texture estimation
Nutrient retention (CEC) assessment
Soil structural analysis

Advantages:

Critical for understanding nutrient retention
Important for soil fertility assessment

Impact Level: HIGH
6. Cellulose Absorption Index (CAI)
Formula:

Sentinel-2: CAI = 0.5*(B11+B12) - B12
Landsat 8/9: CAI = 0.5*(Band 6 + Band 7) - Band 7

Applications:

Organic matter estimation
SOM (Soil Organic Matter) mapping
Carbon sequestration studies
Nutrient cycling evaluation

Advantages:

Direct organic matter indicator
Important for soil health

7. Iron Oxide Ratio (IOR)
Formula:

Sentinel-2: IOR = B04 / B02
Landsat 8/9: IOR = Band 4 / Band 2

Applications:

Iron content and soil pH assessment
Nutrient solubility evaluation
Soil color characterization

Advantages:

Indicates pH and iron oxide content
Useful for nutrient availability assessment

8. Modified Simple Ratio (MSR) - Tier 2 Priority
Formula:

Sentinel-2: MSR = (B08/B04 - 1) / sqrt(B08/B04 + 1)
Landsat 8/9: MSR = (Band 5/Band 4 - 1) / sqrt(Band 5/Band 4 + 1)

Applications:

Phosphorus/Potassium status assessment
Overall plant health evaluation
LAI relationship analysis

Advantages:

Linear LAI relationship
P/K sensitivity

Impact Level: HIGH

Urban and Built-up Area Indices
1. Normalized Difference Built-up Index (NDBI)
Formula:

Sentinel-2: NDBI = (B11 - B08) / (B11 + B08)
Landsat 8/9: NDBI = (Band 6 - Band 5) / (Band 6 + Band 5)

Applications:

Built-up area extraction
Urban expansion and infrastructure monitoring
LULC classification enhancement

Advantages:

Effective for urban area detection
Widely used and validated

2. Index-based Built-up Index (IBI)
Formula:

Sentinel-2: IBI = (2*B11/(B11 + B08) - (B08/(B08 + B04) + B03/(B03 + B11))) / (2*B11/(B11 + B08) + (B08/(B08 + B04) + B03/(B03 + B11)))

Applications:

Comprehensive built-up area mapping
Urban density and city planning
Complex urban environment analysis

Advantages:

Combines multiple spectral characteristics
More comprehensive than simple ratios

3. Built-up Area Extraction Index (BAEI)
Formula:

Sentinel-2: BAEI = (B04 + 0.3) / (B03 + B11)
Landsat 8/9: BAEI = (Band 4 + 0.3) / (Band 3 + Band 6)

Applications:

Enhanced built-up site extraction
Urban boundary delineation
Construction monitoring

Advantages:

Improved built-up detection accuracy
Good for mixed environments

4. Enhanced Built-up & Bareness Index (EBBI)
Formula:

Sentinel-2: EBBI = (B11 - B08) / (10 * sqrt(B11 + B04))
Landsat 8/9: EBBI = (Band 6 - Band 5) / (10 * sqrt(Band 6 + Band 4))

Applications:

Combined built-up and bare soil mapping
Multi-class LULC classification
Land cover change detection

Advantages:

Distinguishes between built-up and bare areas
Good for comprehensive mapping


Hazard and Disaster Management Indices
1. Normalized Burn Ratio (NBR)
Formula:

Sentinel-2: NBR = (B08 - B12) / (B08 + B12)
Landsat 8/9: NBR = (Band 5 - Band 7) / (Band 5 + Band 7)

Applications:

Fire severity assessment
Burned area mapping
Post-fire vegetation recovery monitoring
Fire risk evaluation

Advantages:

Strong correlation with burn severity
Widely validated for fire applications

2. Differenced Normalized Burn Ratio (dNBR)
Formula: dNBR = NBR_pre-fire - NBR_post-fire
Applications:

Fire severity classification
Burn severity mapping
Post-fire recovery tracking

Severity Classification:

Unburned: dNBR < 0.1
Low severity: 0.1 ≤ dNBR < 0.27
Moderate-low severity: 0.27 ≤ dNBR < 0.44
Moderate-high severity: 0.44 ≤ dNBR < 0.66
High severity: dNBR ≥ 0.66

3. Burn Area Index (BAI)
Formula:

Sentinel-2: BAI = 1 / ((0.1 - B04)² + (0.06 - B08)²)
Landsat 8/9: BAI = 1 / ((0.1 - Band 4)² + (0.06 - Band 5)²)

Applications:

Burned area enhancement
Fire scar detection
Historical fire mapping

Advantages:

Highlights burned areas effectively
Good for fire scar identification

4. Normalized Difference Drought Index (NDDI)
Formula: NDDI = (NDVI - NDWI) / (NDVI + NDWI)
Applications:

Drought severity assessment
Agricultural drought monitoring
Combined vegetation-water stress analysis

Advantages:

Combines vegetation and water stress indicators
Comprehensive drought assessment

5. Mid-Infrared Burn Index (MIRBI)
Formula:

Sentinel-2: MIRBI = 10*B12 - 9.8*B11 + 2
Landsat 8/9: MIRBI = 10*Band 7 - 9.8*Band 6 + 2

Applications:

Active fire detection
Mid-infrared burn assessment


Specialized Nutrient and Mineral Indices
1. Chlorophyll Index Red Edge (CIred-edge) - Tier 1 Priority
Formula (Sentinel-2 Only): CIred-edge = (B08 / B05) - 1
Applications:

Direct chlorophyll estimation
Nitrogen deficiency assessment
Precision fertilizer application
Crop health monitoring

Advantages:

Simple calculation
High nitrogen sensitivity
Direct relationship with chlorophyll content

Impact Level: VERY HIGH
2. Triangle Greenness Index (TGI) - Tier 2 Priority
Formula:

Sentinel-2: TGI = B03 - 0.39*B04 - 0.61*B02
Landsat 8/9: TGI = Band 3 - 0.39*Band 4 - 0.61*Band 2

Applications:

Early nitrogen stress detection
Pre-symptom stress identification
Early warning system for nutrient deficiency

Advantages:

Detects stress before visual symptoms
Excellent for early intervention

Impact Level: HIGH
3. Advanced Red Edge Indices (Sentinel-2 Only)
Red Edge Chlorophyll Index (RECI)
Formula: RECI = (B08 / B05) - 1
Red Edge Position (REP)
Formula: Complex algorithm using B05, B06, B07, B04
Applications:

Advanced nitrogen and chlorophyll assessment
Precision agriculture applications
Research-level vegetation analysis

4. Gypsum, Quartz, Carbonate Indices
Note: Specialized ratios using ASTER bands (not available on Sentinel/Landsat)
Applications:

Soil mineralogy assessment
Resource/mineral mapping
Geological exploration studies

Limitation: Requires hyperspectral or ASTER data
---

## Implementation Guidelines

### Priority Implementation Strategy

#### **Tier 1 - Immediate Implementation (Highest ROI)**
1. **RENDVI** (Sentinel-2) - Replace NDVI for nitrogen assessment
2. **NDVI** - Essential baseline vegetation index
3. **SI** - Critical for soil salinity evaluation
4. **CIred-edge** (Sentinel-2) - Best chlorophyll/nitrogen indicator
5. **MNDWI** - Enhanced water detection

#### **Tier 2 - Secondary Implementation (High Value)**
6. **EVI** - Better than NDVI for dense vegetation
7. **NDMI** - Moisture stress monitoring
8. **CMR** (Sentinel-2) - Nutrient retention capacity
9. **TGI** - Early nitrogen stress warning
10. **NDBI** - Urban area mapping

#### **Tier 3 - Specialized Applications**
11. **NBR/dNBR** - Fire and disaster management
12. **CAI** (Sentinel-2) - Organic matter assessment
13. **NDTI** - Tillage practice monitoring
14. **PSRI** - Crop maturity timing
15. **BAI** - Burn area enhancement

### Platform Selection Guide

#### **Sentinel-2 Advantages:**
- **Red Edge bands (B05, B06, B07)** - CRITICAL for nitrogen detection
- Higher spatial resolution (10-20m)
- More frequent revisit (5 days with both satellites)
- Free access through Copernicus
- **Best choice for precision agriculture**

#### **Landsat 8/9 Advantages:**
- Longer historical archive (50+ years)
- Thermal bands available
- Good for soil properties assessment
- **Limitation: NO Red Edge bands**

#### **Recommended Combined Approach:**
- Use **Sentinel-2** for vegetation and nutrient analysis
- Use **Landsat** for long-term monitoring and soil properties
- Consider **Harmonized Landsat Sentinel-2 (HLS)** for seamless integration

### Processing Recommendations

#### **Essential Software/Platforms:**
1. **Google Earth Engine** - Large-scale cloud processing
2. **SNAP (ESA)** - Free Sentinel processing toolkit
3. **QGIS** - Open source GIS with remote sensing plugins
4. **Python** - Custom processing (rasterio, earthengine-api)
5. **R** - Statistical analysis with RStoolbox

#### **Validation Strategies:**
1. **Spatial Cross-Validation** - Avoid spatial autocorrelation bias
2. **Temporal Validation** - Test across multiple seasons
3. **Independent Test Sites** - Unbiased accuracy assessment
4. **Ground Truth Integration** - IoT sensors, field measurements

---

## Quick Reference Tables

### Best Indices by Application

| Application | Primary Index | Secondary Index | Platform | Expected Accuracy |
|-------------|---------------|-----------------|----------|------------------|
| **Nitrogen Detection** | RENDVI | CIred-edge | Sentinel-2 | 78-89% |
| **General Vegetation** | NDVI | EVI | Both | 70-85% |
| **Soil Salinity** | SI | NDSI | Both | 82-91% |
| **Water Mapping** | MNDWI | NDWI | Both | 85-95% |
| **Built-up Areas** | NDBI | IBI | Both | 75-88% |
| **Fire Assessment** | dNBR | NBR | Both | 80-92% |
| **Moisture Stress** | NDMI | NMDI | Both | 65-80% |
| **P/K Assessment** | EVI | MSR | Both | 68-78% |
| **Organic Matter** | CAI | NDTI | Sentinel-2 | 75-85% |
| **Early Stress** | TGI | GNDVI | Both | 70-82% |

### Seasonal Application Guide

| Season | Primary Focus | Recommended Indices | Key Notes |
|--------|---------------|-------------------|-----------|
| **Early Season** | Soil properties, early stress | SI, NDSI, TGI, OSAVI | Best for bare/sparse vegetation |
| **Growing Season** | Vegetation vigor, nutrients | RENDVI, NDVI, EVI, CIred-edge | Peak sensitivity period |
| **Mid-Season** | Water stress, health monitoring | NDMI, NMDI, MSI, GNDVI | Monitor stress conditions |
| **Late Season** | Senescence, harvest timing | PSRI, CRI, NBR | Maturity assessment |
| **Post-Harvest** | Soil exposure, tillage | BSI, NDTI, CMR, CAI | Soil and residue analysis |

### Formula Quick Reference - Sentinel-2

| Index | Formula | Primary Application |
|-------|---------|-------------------|
| **NDVI** | `(B08-B04)/(B08+B04)` | General vegetation health |
| **RENDVI** | `(B08-B05)/(B08+B05)` | **Nitrogen detection** |
| **EVI** | `2.5*(B08-B04)/(B08+6*B04-7.5*B02+1)` | Dense vegetation |
| **SI** | `sqrt(B02*B04)` | **Soil salinity** |
| **MNDWI** | `(B03-B11)/(B03+B11)` | Water extraction |
| **NDBI** | `(B11-B08)/(B11+B08)` | Built-up areas |
| **CMR** | `B11/B12` | **Clay content/CEC** |
| **CIred-edge** | `(B08/B05)-1` | **Chlorophyll/Nitrogen** |
| **NBR** | `(B08-B12)/(B08+B12)` | Fire assessment |
| **NDMI** | `(B08-B11)/(B08+B11)` | Moisture stress |

### Best Practices Summary

#### **Data Quality Considerations:**
- Use cloud-free imagery (<10% cloud cover)
- Apply atmospheric correction (Level-2A for Sentinel-2)
- Consider temporal consistency for multi-date analysis
- Validate results with ground truth data

#### **Index Selection Guidelines:**
- **For nitrogen assessment:** Use RENDVI over NDVI (Sentinel-2)
- **For dense vegetation:** Use EVI over NDVI
- **For water in urban areas:** Use MNDWI over NDWI
- **For early crop stages:** Use SAVI/OSAVI over NDVI
- **For fire applications:** Use dNBR over single-date NBR

#### **Temporal Considerations:**
- **Growing season:** Red edge indices most effective
- **Post-harvest:** SWIR-based indices for soil properties
- **Early season:** Blue/Green bands for early stress detection
- **Multi-temporal:** Use harmonized time series for trend analysis

---

## Conclusion

This comprehensive guide provides a structured approach to implementing remote sensing indices for various Earth observation applications. **Sentinel-2's red edge bands provide a significant advantage for agricultural and nutrient analysis**, making it the preferred platform for precision agriculture applications.

**Key Takeaways:**
1. **Start with Tier 1 indices** for immediate impact and highest ROI
2. **Sentinel-2 is superior for precision agriculture** due to red edge capabilities
3. **Combine multiple indices** for comprehensive and robust analysis
4. **Use proper validation methods** for reliable accuracy assessment
5. **Integrate ground truth data** whenever possible for calibration

**Expected Performance Improvements:**
- RENDVI vs NDVI for nitrogen: **+10-15% accuracy improvement**
- Multi-sensor fusion approach: **+15-25% overall accuracy**
- Proper validation methods: **+20-30% reliability increase**

This guide serves as a practical reference for implementing advanced remote sensing analysis workflows using Sentinel and Landsat data for agriculture, environmental monitoring, urban planning, and disaster management applications.