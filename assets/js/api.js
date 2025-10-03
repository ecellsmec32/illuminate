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
}

// Create global API instance
const api = new ApiService(CONFIG.API_BASE_URL);
