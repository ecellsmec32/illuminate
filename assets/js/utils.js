/**
 * QrFlow - Utility Functions
 * Helper functions for common tasks
 */

const Utils = {
    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        // Remove existing toasts
        const existingToast = document.querySelector('.qrflow-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `qrflow-toast qrflow-toast-${type}`;
        toast.innerHTML = `
            <div class="qrflow-toast-content">
                <i class="bi bi-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * Get toast icon based on type
     */
    getToastIcon(type) {
        const icons = {
            success: 'check-circle-fill',
            error: 'x-circle-fill',
            warning: 'exclamation-circle-fill',
            info: 'info-circle-fill'
        };
        return icons[type] || icons.info;
    },

    /**
     * Format date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    },

    /**
     * Format date (short)
     */
    formatDateShort(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    },

    /**
     * Format time
     */
    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
        });
    },

    /**
     * Show loading spinner
     */
    showLoading(element) {
        const spinner = document.createElement('div');
        spinner.className = 'qrflow-spinner';
        spinner.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';
        element.appendChild(spinner);
    },

    /**
     * Hide loading spinner
     */
    hideLoading(element) {
        const spinner = element.querySelector('.qrflow-spinner');
        if (spinner) {
            spinner.remove();
        }
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Get event status
     */
    getEventStatus(eventDate) {
        const now = new Date();
        const event = new Date(eventDate);
        const diff = event - now;
        const days = diff / (1000 * 60 * 60 * 24);

        if (days < 0) {
            return { label: 'Completed', class: 'secondary' };
        } else if (days < 1) {
            return { label: 'Ongoing', class: 'success' };
        } else {
            return { label: 'Upcoming', class: 'primary' };
        }
    },

    /**
     * Calculate percentage
     */
    calculatePercentage(part, total) {
        if (total === 0) return 0;
        return Math.round((part / total) * 100);
    }
};
