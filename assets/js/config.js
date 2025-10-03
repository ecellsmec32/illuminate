const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8000'
        : 'https://clgserver.duckdns.org',  // HTTPS domain!
    
    APP_NAME: 'QrFlow',
    VERSION: '1.0.0'
};

console.log('🔗 QrFlow API URL:', CONFIG.API_BASE_URL);
