/**
 * QrFlow - API Service
 * Handles all API requests with authentication
 */

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * Get authentication token from localStorage
     */
    getToken() {
        return localStorage.getItem('qrflow_token');
    }

    /**
     * Set authentication token
     */
    setToken(token) {
        localStorage.setItem('qrflow_token', token);
    }

    /**
     * Remove authentication token
     */
    removeToken() {
        localStorage.removeItem('qrflow_token');
        localStorage.removeItem('qrflow_user');
    }

    /**
     * Get stored user data
     */
    getUser() {
        const user = localStorage.getItem('qrflow_user');
        return user ? JSON.parse(user) : null;
    }

    /**
     * Store user data
     */
    setUser(user) {
        localStorage.setItem('qrflow_user', JSON.stringify(user));
    }

    /**
     * Generic request method
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getToken();

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token && !endpoint.includes('/auth/login')) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);

            // Handle 401 Unauthorized
            if (response.status === 401) {
                this.removeToken();
                window.location.href = '/index.html';
                throw new Error('Unauthorized. Please login again.');
            }

            // Parse JSON response
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /**
     * GET request
     */
    async get(endpoint) {
        return this.request(endpoint, {
            method: 'GET'
        });
    }

    /**
     * POST request
     */
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * PUT request
     */
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }

    /**
     * Upload file (multipart/form-data)
     */
    async uploadFile(endpoint, formData) {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getToken();

        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Upload failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Upload Error:', error);
            throw error;
        }
    }

    /**
     * Login with form data
     */
    async login(username, password) {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${this.baseURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Login failed');
        }

        return await response.json();
    }

    // ============= Admin API Methods =============
    
    /**
     * Get all clubs
     */
    async getClubs() {
        return this.get('/api/admin/clubs');
    }

    /**
     * Create a new club
     */
    async createClub(clubData) {
        return this.post('/api/admin/clubs', clubData);
    }

    /**
     * Update a club
     */
    async updateClub(clubId, clubData) {
        return this.put(`/api/admin/clubs/${clubId}`, clubData);
    }

    /**
     * Delete a club
     */
    async deleteClub(clubId) {
        return this.delete(`/api/admin/clubs/${clubId}`);
    }

    /**
     * Enable a disabled club
     */
    async enableClub(clubId) {
        return this.post(`/api/admin/clubs/${clubId}/enable`);
    }

    /**
     * Get all users
     */
    async getUsers() {
        return this.get('/api/admin/users');
    }

    /**
     * Create a new user
     */
    async createUser(userData) {
        return this.post('/api/admin/users', userData);
    }

    /**
     * Update a user
     */
    async updateUser(userId, userData) {
        return this.put(`/api/admin/users/${userId}`, userData);
    }

    /**
     * Delete a user
     */
    async deleteUser(userId) {
        return this.delete(`/api/admin/users/${userId}`);
    }

    /**
     * Enable a disabled user
     */
    async enableUser(userId) {
        return this.post(`/api/admin/users/${userId}/enable`);
    }

    /**
     * Get activity logs
     */
    async getActivityLogs(skip = 0, limit = 100) {
        return this.get(`/api/admin/logs?skip=${skip}&limit=${limit}`);
    }

    // ============= Event API Methods =============
    
    /**
     * Get all events
     */
    async getEvents() {
        return this.get('/api/events');
    }

    /**
     * Create a new event
     */
    async createEvent(eventData) {
        return this.post('/api/events', eventData);
    }

    /**
     * Get event details
     */
    async getEvent(eventId) {
        return this.get(`/api/events/${eventId}`);
    }

    /**
     * Update an event
     */
    async updateEvent(eventId, eventData) {
        return this.put(`/api/events/${eventId}`, eventData);
    }

    /**
     * Delete an event
     */
    async deleteEvent(eventId) {
        return this.delete(`/api/events/${eventId}`);
    }

    // ============= Attendee API Methods =============
    
    /**
     * Get event attendees
     */
    async getEventAttendees(eventId) {
        return this.get(`/api/events/${eventId}/attendees`);
    }

    /**
     * Upload attendees CSV
     */
    async uploadAttendeesCSV(eventId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.uploadFile(`/api/events/${eventId}/attendees/upload`, formData);
    }

    /**
     * Download attendees template
     */
    async downloadAttendeesTemplate(eventId) {
        const response = await fetch(`${this.baseURL}/api/events/${eventId}/attendees/template`, {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to download template');
        }
        
        return response.blob();
    }

    /**
     * Update attendee
     */
    async updateAttendee(attendeeId, attendeeData) {
        return this.put(`/api/attendees/${attendeeId}`, attendeeData);
    }

    /**
     * Delete attendee
     */
    async deleteAttendee(attendeeId) {
        return this.delete(`/api/attendees/${attendeeId}`);
    }

    // ============= QR Code API Methods =============
    
    /**
     * Generate QR codes for event
     */
    async generateQRCodes(eventId) {
        return this.post(`/api/events/${eventId}/generate-qr`);
    }

    /**
     * Resend QR code to attendee
     */
    async resendQRCode(attendeeId) {
        return this.post(`/api/attendees/${attendeeId}/resend-qr`);
    }

    // ============= Check-in API Methods =============
    
    /**
     * Scan QR code for check-in
     */
    async scanQRCheckin(qrToken) {
        return this.post('/api/checkin/scan', { qr_token: qrToken });
    }

    /**
     * Manual check-in for attendee
     */
    async manualCheckin(attendeeId) {
        return this.post(`/api/attendees/${attendeeId}/checkin-manual`);
    }

    /**
     * Validate QR token and get attendee information
     */
    async validateQRToken(qrToken) {
        return this.post('/api/checkin/validate', { qr_token: qrToken });
    }

    // ============= Dashboard API Methods =============
    
    /**
     * Get event dashboard
     */
    async getEventDashboard(eventId) {
        return this.get(`/api/events/${eventId}/dashboard`);
    }

    /**
     * Export attendees CSV
     */
    async exportAttendeesCSV(eventId) {
        const response = await fetch(`${this.baseURL}/api/events/${eventId}/export`, {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to export CSV');
        }
        
        return response.blob();
    }

    // ============= Payment API Methods =============
    
    /**
     * Get event payments
     */
    async getEventPayments(eventId) {
        return this.get(`/api/events/${eventId}/payments`);
    }

    /**
     * Manual payment sync
     */
    async syncPayments() {
        return this.post('/api/payments/sync');
    }

    /**
     * Get Razorpay payment status
     */
    async getRazorpayPaymentStatus(paymentId) {
        return this.get(`/api/payments/razorpay-status?payment_id=${paymentId}`);
    }
}

// Create global API instance
const api = new ApiService(CONFIG.API_BASE_URL);
