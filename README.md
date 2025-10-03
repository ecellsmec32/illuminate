# QrFlow Frontend - Event Management System

Modern web interface for QrFlow event management system with QR code-based check-ins.

## Features

- 🔐 JWT Authentication
- 📅 Event Management
- �� Attendee Management
- 📱 Mobile-optimized QR Scanner
- 📊 Real-time Check-in Dashboard
- 👨‍💼 Admin Panel
- 🎨 Responsive Design (Mobile-first)

## Tech Stack

- **Framework**: Vanilla JavaScript (ES6+)
- **UI**: Bootstrap 5.3
- **Icons**: Bootstrap Icons
- **QR Scanner**: jsQR
- **Deployment**: Vercel

## Quick Start (Local Development)

### Prerequisites

- Python 3 (for local server) or any HTTP server
- Backend API running (http://localhost:8000)

### Installation

1. **Clone repository**

git clone https://github.com/yourusername/qrflow-frontend.git
cd qrflow-frontend

text

2. **Start local server**

Using Python

python3 -m http.server 8080
Or using Node.js

npx http-server -p 8080

text

3. **Open in browser**

http://localhost:8080

text

4. **Login**
- Username: `admin`
- Password: `admin123`

## Deployment to Vercel

### Method 1: Using Vercel CLI

1. **Install Vercel CLI**

npm install -g vercel

text

2. **Login to Vercel**

vercel login

text

3. **Deploy**

vercel

text

4. **Set Environment Variable**
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add: `VITE_API_URL` = `https://your-backend-url.com`

5. **Redeploy**

vercel --prod

text

### Method 2: Using GitHub Integration

1. **Push to GitHub**

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/qrflow-frontend.git
git push -u origin main

text

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import from GitHub
- Select `qrflow-frontend` repository

3. **Configure**
- Framework Preset: Other
- Build Command: (leave empty)
- Output Directory: `.`
- Install Command: (leave empty)

4. **Add Environment Variable**
- Go to Settings → Environment Variables
- Add: `VITE_API_URL` = `https://your-backend-url.com`

5. **Deploy**
- Click "Deploy"
- Wait for deployment to complete

## Configuration

### API URL Configuration

The frontend automatically detects the environment:

- **Local Development**: Uses `http://localhost:8000`
- **Production**: Uses environment variable or default URL

To set production API URL:

**Option 1: Vercel Environment Variable**

VITE_API_URL=https://api.yourdomain.com

text

**Option 2: Modify config.js**

// In assets/js/config.js
return 'https://api.yourdomain.com';

text

## Project Structure

qrflow-frontend/
├── index.html # Login page
├── organizer/
│ ├── dashboard.html # Event list
│ ├── event-details.html # Attendee management
│ ├── scanner.html # QR scanner (legacy)
│ ├── scanner-v2.html # QR scanner (working)
│ └── checkin-dashboard.html # Real-time dashboard
├── admin/
│ ├── dashboard.html # Admin overview
│ ├── clubs.html # Club management
│ ├── users.html # User management
│ └── logs.html # Activity logs
├── assets/
│ ├── css/
│ │ └── qrflow.css # Custom styles
│ ├── js/
│ │ ├── config.js # Configuration
│ │ ├── api.js # API wrapper
│ │ ├── auth.js # Authentication
│ │ └── utils.js # Utilities
│ └── img/ # Images
├── vercel.json # Vercel config
├── .gitignore # Git ignore rules
└── README.md # This file

text

## Pages Overview

### Public
- **Login** (`/index.html`) - Authentication

### Organizer
- **Dashboard** - Event list with stats
- **Event Details** - Manage attendees, upload CSV
- **QR Scanner** - Mobile scanner for check-ins
- **Check-in Dashboard** - Real-time attendance tracking

### Admin
- **Dashboard** - System overview
- **Clubs** - CRUD operations for clubs
- **Users** - CRUD operations for users
- **Logs** - Activity monitoring

## Features Detail

### QR Scanner
- Works on mobile and desktop
- Real-time scanning using device camera
- Manual check-in fallback
- Recent scans history
- Sound feedback

### Check-in Dashboard
- Real-time updates (5-second polling)
- Segregated view: Branch → Year → Section
- Filter by status (All/Checked In/Pending)
- Live attendance statistics

### CSV Upload
- Download template
- Bulk attendee upload
- Error reporting
- Format validation

## Browser Support

- Chrome/Edge: ✅ (Recommended)
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

**Note**: QR scanner requires camera access permissions.

## Troubleshooting

### Camera not working
1. Ensure HTTPS (or localhost)
2. Grant camera permissions
3. Use scanner-v2.html instead of scanner.html

### API connection failed
1. Check `assets/js/config.js`
2. Verify backend URL
3. Check CORS settings on backend
4. Verify backend is running

### Login not working
1. Clear browser cache
2. Check browser console for errors
3. Verify API URL is correct

## Development

### Making Changes

1. Edit files locally
2. Test with local HTTP server
3. Commit changes
4. Push to GitHub
5. Vercel auto-deploys

### Testing Locally

Start server

python3 -m http.server 8080
Open browser

http://localhost:8080
Test with local backend
Ensure backend is running on http://localhost:8000

text

## Security Notes

- Always use HTTPS in production
- Change default admin password
- Keep JWT tokens secure
- Enable CORS only for trusted domains

## Performance

- Minimal dependencies (vanilla JS)
- CDN-hosted libraries
- Lazy loading where possible
- Optimized images

## License

MIT

## Support

For issues and questions:
- Email: support@yourdomain.com
- GitHub: https://github.com/yourusername/qrflow-frontend/issues

## Credits

Built with ❤️ using modern web technologies.
