/**
 * QrFlow - Authentication Helper
 * Handles login, logout, and auth checks
 */

const Auth = {
    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!api.getToken();
    },

    /**
     * Get current user
     */
    getCurrentUser() {
        return api.getUser();
    },

    /**
     * Require authentication (redirect if not logged in)
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/index.html';
        }
    },

    /**
     * Require specific role
     */
    requireRole(role) {
        this.requireAuth();
        const user = this.getCurrentUser();
        if (user.role !== role && user.role !== 'admin') {
            alert('Access denied');
            this.logout();
        }
    },

    /**
     * Login
     */
    async login(username, password) {
        try {
            // Call login API
            const response = await api.login(username, password);
            
            // Store token
            api.setToken(response.access_token);
            
            // Fetch user details
            const user = await api.get('/api/auth/me');
            api.setUser(user);
            
            // Redirect based on role
            if (user.role === 'admin') {
                window.location.href = '/admin/dashboard.html';
            } else {
                window.location.href = '/organizer/dashboard.html';
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logout
     */
    async logout() {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            api.removeToken();
            window.location.href = '/index.html';
        }
    }
};
