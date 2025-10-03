/**
 * QrFlow - Configuration
 * API endpoint configuration with environment detection
 */

// Detect environment and set API URL
const getApiBaseUrl = () => {
    // Check if running on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000';
    }
    
    // Production API URL (will be set via Vercel env variable)
    if (typeof VITE_API_URL !== 'undefined') {
        return VITE_API_URL;
    }
    
    // Default production URL (replace with your actual backend URL)
    return window.location.protocol + '//api.qrflow.com';
};

const CONFIG = {
    API_BASE_URL: getApiBaseUrl(),
    APP_NAME: 'QrFlow',
    VERSION: '1.0.0'
};

// For debugging
console.log('QrFlow Config:', CONFIG);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
