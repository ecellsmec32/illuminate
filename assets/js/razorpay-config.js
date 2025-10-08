/**
 * Razorpay Configuration
 * E-Cell SMEC Illuminate Workshop Payment Integration
 */

const RAZORPAY_CONFIG = {
    // Live API Keys
    KEY_ID: 'rzp_live_RQeY5qcUfdCwiV',
    KEY_SECRET: 'JU9EowVKPbks9jxAEf32ek9D',
    
    // Payment Page URL
    PAYMENT_PAGE_URL: 'https://pages.razorpay.com/illuminate-ecell',
    
    // Workshop Details
    WORKSHOP: {
        NAME: 'Illuminate 2025',
        AMOUNT: 65000, // Amount in paise (₹650)
        CURRENCY: 'INR',
        DESCRIPTION: 'E-Cell SMEC Illuminate Entrepreneurship Workshop',
        ORGANIZER: 'E-Cell SMEC'
    },
    
    // Payment Options
    PAYMENT_OPTIONS: {
        NETWORK: ['visa', 'mastercard', 'rupay'],
        PAYMENT_METHODS: ['card', 'netbanking', 'wallet', 'upi'],
        THEME: {
            COLOR: '#FFC700'
        }
    }
};

/**
 * Initialize Razorpay Payment
 * @param {Object} options - Payment options
 * @returns {Object} Razorpay instance
 */
function initializeRazorpayPayment(options = {}) {
    const config = {
        key: RAZORPAY_CONFIG.KEY_ID,
        amount: options.amount || RAZORPAY_CONFIG.WORKSHOP.AMOUNT,
        currency: options.currency || RAZORPAY_CONFIG.WORKSHOP.CURRENCY,
        name: options.name || RAZORPAY_CONFIG.WORKSHOP.NAME,
        description: options.description || RAZORPAY_CONFIG.WORKSHOP.DESCRIPTION,
        image: 'Untitled design.png', // Logo
        order_id: options.order_id,
        handler: function (response) {
            // Payment success callback
            console.log('Payment successful:', response);
            if (options.onSuccess) {
                options.onSuccess(response);
            }
        },
        prefill: {
            name: options.customer_name || '',
            email: options.customer_email || '',
            contact: options.customer_phone || ''
        },
        notes: {
            workshop: 'Illuminate 2025',
            organizer: 'E-Cell SMEC'
        },
        theme: RAZORPAY_CONFIG.PAYMENT_OPTIONS.THEME,
        modal: {
            ondismiss: function() {
                if (options.onDismiss) {
                    options.onDismiss();
                }
            }
        }
    };
    
    return new Razorpay(config);
}

/**
 * Redirect to Razorpay Payment Page
 */
function redirectToPaymentPage() {
    window.open(RAZORPAY_CONFIG.PAYMENT_PAGE_URL, '_blank');
}

/**
 * Get Payment Page URL
 * @returns {string} Payment page URL
 */
function getPaymentPageURL() {
    return RAZORPAY_CONFIG.PAYMENT_PAGE_URL;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RAZORPAY_CONFIG,
        initializeRazorpayPayment,
        redirectToPaymentPage,
        getPaymentPageURL
    };
}

// Make functions available globally
window.RazorpayConfig = {
    initializePayment: initializeRazorpayPayment,
    redirectToPayment: redirectToPaymentPage,
    getPaymentURL: getPaymentPageURL,
    config: RAZORPAY_CONFIG
};
