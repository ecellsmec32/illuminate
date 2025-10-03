/**
 * QrFlow - Configuration
 * API endpoint configuration with environment detection
 */

const getApiBaseUrl = () => {
    // Check if running on localhost (development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000';
    }
    
    // Production: Use environment variable injected by Vercel
    // The environment variable will be replaced during build
    const envApiUrl = '__VITE_API_URL__'; // Placeholder
    
    // If environment variable is set (not the placeholder)
    if (envApiUrl && !envApiUrl.includes('__VITE_API_URL__')) {
        return envApiUrl;
    }
    
    // Fallback: Hardcoded production URL (UPDATE THIS!)
    return 'http://YOUR_EC2_IP:8000';
};

const CONFIG = {
    API_BASE_URL: getApiBaseUrl(),
    APP_NAME: 'QrFlow',
    VERSION: '1.0.0'
};

// For debugging
console.log('QrFlow Config - API URL:', CONFIG.API_BASE_URL);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
