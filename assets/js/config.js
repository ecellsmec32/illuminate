const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8000'
        : 'http://44.223.11.89',  // Use port 80 (Nginx)
    
    APP_NAME: 'QrFlow',
    VERSION: '1.0.0'
};

console.log('🔗 QrFlow API URL:', CONFIG.API_BASE_URL);
