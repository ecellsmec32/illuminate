/**
 * MessageDisplay - Enhanced message formatting and display utilities
 * Handles the new QR scanning API response format
 */

class MessageDisplay {
    /**
     * Format message for display with proper styling
     */
    static formatMessage(message) {
        if (!message) return '';
        
        // Split by \n\n for sections
        const sections = message.split('\n\n');
        return sections.map((section, index) => {
            // Split by \n for lines within sections
            const lines = section.split('\n');
            return {
                section: index,
                lines: lines.map(line => ({
                    text: line,
                    type: this.getLineType(line)
                }))
            };
        });
    }

    /**
     * Determine the type of message line for styling
     */
    static getLineType(line) {
        if (line.includes('✅')) return 'success';
        if (line.includes('❌')) return 'error';
        if (line.includes('👤')) return 'info';
        if (line.includes('🎓')) return 'info';
        if (line.includes('🏫')) return 'info';
        if (line.includes('📅')) return 'info';
        return 'default';
    }

    /**
     * Get message class for styling
     */
    static getMessageClass(message) {
        if (message.includes('✅')) return 'success-message';
        if (message.includes('❌')) return 'error-message';
        return 'info-message';
    }

    /**
     * Get message type for result handling
     */
    static getMessageType(message) {
        if (message.includes('✅') && !message.includes('already checked in')) return 'success';
        if (message.includes('❌')) return 'error';
        if (message.includes('already checked in')) return 'info';
        return 'info';
    }

    /**
     * Create formatted HTML for message display
     */
    static createMessageHTML(message) {
        const formattedMessage = this.formatMessage(message);
        const messageClass = this.getMessageClass(message);
        
        let html = `<div class="message-display ${messageClass}">`;
        
        formattedMessage.forEach(section => {
            html += `<div class="message-section">`;
            section.lines.forEach(line => {
                const lineClass = line.type !== 'default' ? `message-line-${line.type}` : 'message-line';
                html += `<div class="${lineClass}">${this.escapeHtml(line.text)}</div>`;
            });
            html += `</div>`;
        });
        
        html += `</div>`;
        return html;
    }

    /**
     * Escape HTML to prevent XSS
     */
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show formatted message in result modal
     */
    static showResultModal(message, title = null) {
        const modal = document.getElementById('resultModal');
        const icon = document.getElementById('resultIcon');
        const titleEl = document.getElementById('resultTitle');
        const messageEl = document.getElementById('resultMessage');
        
        const messageType = this.getMessageType(message);
        const messageHTML = this.createMessageHTML(message);
        
        // Set icon and title based on message type
        if (messageType === 'success') {
            icon.textContent = '✅';
            icon.className = 'text-6xl mb-4 text-green-500';
            titleEl.textContent = title || 'Check-in Successful';
        } else if (messageType === 'error') {
            icon.textContent = '❌';
            icon.className = 'text-6xl mb-4 text-red-500';
            titleEl.textContent = title || 'Check-in Failed';
        } else {
            icon.textContent = 'ℹ️';
            icon.className = 'text-6xl mb-4 text-blue-500';
            titleEl.textContent = title || 'Information';
        }
        
        // Replace message content with formatted HTML
        messageEl.innerHTML = messageHTML;
        modal.style.display = 'flex';
    }

    /**
     * Handle API error messages with proper formatting
     */
    static handleApiError(error) {
        console.error('API Error:', error);
        
        // Network errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return '❌ Network error - Please check your connection';
        }
        
        // Extract error message from API response
        const errorMessage = error.message || error.detail || '❌ An unexpected error occurred. Please try again.';
        
        // Enhance specific error messages
        const enhancedErrors = {
            'expired': '❌ QR code has expired - Please request a new QR code',
            'invalid': '❌ Invalid QR code - Please scan a valid QR code',
            'not found': '❌ Attendee not found - Please contact organizer',
            'access denied': '❌ Access denied - You are not authorized for this event',
            'already checked in': '✅ Attendee is already checked in',
            'duplicate': '⚠️ Duplicate pass detected - verification required'
        };
        
        const lowerMessage = errorMessage.toLowerCase();
        for (const [key, value] of Object.entries(enhancedErrors)) {
            if (lowerMessage.includes(key)) {
                return value;
            }
        }
        
        return errorMessage;
    }

    /**
     * Show loading state during API calls
     */
    static showLoading(message = 'Processing...') {
        const modal = document.getElementById('resultModal');
        const icon = document.getElementById('resultIcon');
        const titleEl = document.getElementById('resultTitle');
        const messageEl = document.getElementById('resultMessage');
        
        icon.innerHTML = '<div class="scanning-spinner"></div>';
        icon.className = 'text-6xl mb-4 flex justify-center';
        titleEl.textContent = 'Processing';
        messageEl.textContent = message;
        modal.style.display = 'flex';
    }

    /**
     * Hide result modal
     */
    static hideResultModal() {
        const modal = document.getElementById('resultModal');
        modal.style.display = 'none';
    }
}

// Make MessageDisplay available globally
window.MessageDisplay = MessageDisplay;
