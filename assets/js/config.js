const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8000'
        : 'https://nyxgenai.com',  // Root domain
    
    APP_NAME: 'QrFlow',
    VERSION: '1.0.0',
    
    // Razorpay Configuration
    RAZORPAY: {
        KEY_ID: 'rzp_live_RQeY5qcUfdCwiV',
        KEY_SECRET: 'JU9EowVKPbks9jxAEf32ek9D',
        PAYMENT_PAGE_URL: 'https://pages.razorpay.com/illuminate-ecell'
    }
};

console.log('🔗 QrFlow API URL:', CONFIG.API_BASE_URL);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
