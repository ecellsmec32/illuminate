# QrFlow Frontend - Vercel Deployment Guide

## Quick Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: qrflow-frontend
# - Directory: ./
# - Override settings? N
```

### Method 2: GitHub Integration

1. **Connect GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub
   - Select your repository

2. **Configure Project**
   - Framework Preset: Other
   - Build Command: `echo 'Static site'`
   - Output Directory: `.`
   - Install Command: `echo 'No install needed'`

3. **Environment Variables**
   - Add `API_BASE_URL` if needed
   - Set to your backend API URL

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

## Configuration

### 1. Update API URL

Edit `assets/js/config.js`:

```javascript
const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8000'
        : 'https://your-api-domain.com',  // Your actual API domain
    
    APP_NAME: 'QrFlow',
    VERSION: '1.0.0'
};
```

### 2. Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings
   - Click "Domains"
   - Add your domain

2. **Configure DNS**
   - Add CNAME record pointing to Vercel
   - Or use A records for apex domain

## Environment Variables

Set these in Vercel Dashboard:

```env
# Optional: Override API URL
API_BASE_URL=https://your-api-domain.com

# Environment
NODE_ENV=production
```

## Build Configuration

The `vercel.json` file configures:

- **Static hosting** for all files
- **Security headers** for protection
- **URL rewrites** for SPA routing
- **Clean URLs** without trailing slashes

## Local Development

```bash
# Start local server
python -m http.server 8080

# Or with Node.js
npx serve .

# Access at http://localhost:8080
```

## Deployment Checklist

- [ ] Update API URL in `config.js`
- [ ] Test all pages locally
- [ ] Verify API connectivity
- [ ] Check responsive design
- [ ] Test authentication flow
- [ ] Verify QR code generation
- [ ] Test file uploads
- [ ] Check browser compatibility

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check CORS settings in backend
   - Verify API URL in config.js
   - Check network tab in browser dev tools

2. **Authentication Issues**
   - Clear localStorage
   - Check token expiration
   - Verify API endpoints

3. **Static Assets Not Loading**
   - Check file paths
   - Verify vercel.json configuration
   - Check build output

### Debug Steps

```bash
# Check deployment logs
vercel logs

# Check build status
vercel inspect

# Local testing
vercel dev
```

## Performance Optimization

### 1. Enable Compression
Vercel automatically enables gzip compression.

### 2. CDN
Vercel provides global CDN automatically.

### 3. Caching
Static assets are cached automatically.

### 4. Image Optimization
Use Vercel's Image Optimization API:

```html
<!-- Instead of direct img tags -->
<img src="/assets/img/logo.png" alt="Logo">

<!-- Use Vercel's optimization -->
<img src="/_vercel/image?url=/assets/img/logo.png" alt="Logo">
```

## Security

### Headers Configuration
The `vercel.json` includes security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### HTTPS
Vercel automatically provides HTTPS certificates.

## Monitoring

### 1. Analytics
Enable Vercel Analytics in project settings.

### 2. Performance
Monitor Core Web Vitals in Vercel dashboard.

### 3. Errors
Check function logs for any runtime errors.

## Updates and Maintenance

### 1. Update Frontend
```bash
# Make changes
git add .
git commit -m "Update frontend"
git push origin main

# Vercel auto-deploys
```

### 2. Update API URL
1. Edit `assets/js/config.js`
2. Commit and push
3. Vercel auto-deploys

### 3. Rollback
```bash
# Rollback to previous deployment
vercel rollback

# Or use Vercel dashboard
```

## Support

For issues:
- Check Vercel dashboard logs
- Test locally first
- Check browser console for errors
- Verify API connectivity
- Check CORS configuration

## Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Local development
vercel dev
```
