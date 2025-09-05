/**
 * Crop Disease Detection API Integration
 * 
 * This file contains the core JavaScript code to integrate with your deployed API:
 * https://crop-disease-detection-api-0spd.onrender.com/
 */

class CropDiseaseAPI {
    constructor(baseURL = 'https://crop-disease-detection-api-0spd.onrender.com') {
        this.baseURL = baseURL;
        this.apiURL = `${baseURL}/api`;
    }

    /**
     * Check if the API is running
     */
    async checkStatus() {
        try {
            const response = await fetch(`${this.baseURL}/`);
            const data = await response.json();
            return {
                success: true,
                status: data.status,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Upload and analyze an image for pest/disease detection
     * @param {File} imageFile - The image file to analyze
     * @param {string} cropName - Optional crop name
     * @returns {Promise<Object>} Analysis results
     */
    async analyzeImage(imageFile, cropName = null) {
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            
            if (cropName) {
                formData.append('crop_name', cropName);
            }

            const response = await fetch(`${this.apiURL}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                data: result
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get detection history
     * @returns {Promise<Object>} List of previous detections
     */
    async getHistory() {
        try {
            const response = await fetch(`${this.apiURL}/history`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const history = await response.json();
            return {
                success: true,
                data: history
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get a specific detection by ID
     * @param {string} detectionId - The detection ID
     * @returns {Promise<Object>} Detection details
     */
    async getDetection(detectionId) {
        try {
            const response = await fetch(`${this.apiURL}/detections/${detectionId}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const detection = await response.json();
            return {
                success: true,
                data: detection
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Health check endpoint
     * @returns {Promise<Object>} Health status
     */
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            const data = await response.json();
            return {
                success: true,
                data: data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Ready check endpoint
     * @returns {Promise<Object>} Readiness status
     */
    async readyCheck() {
        try {
            const response = await fetch(`${this.baseURL}/ready`);
            const data = await response.json();
            return {
                success: true,
                data: data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get available crops from the API
     * @returns {Promise<Object>} List of available crops
     */
    async getCrops() {
        try {
            const response = await fetch(`${this.apiURL}/crops`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const crops = await response.json();
            return {
                success: true,
                data: crops
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Create and export a singleton instance
export const cropDiseaseAPI = new CropDiseaseAPI(
    import.meta.env.VITE_API_BASE_URL || 'https://crop-disease-detection-api-0spd.onrender.com'
);

// Export the class for direct use if needed
export { CropDiseaseAPI };

// Backward compatibility
export const apiService = cropDiseaseAPI;
export default cropDiseaseAPI;
