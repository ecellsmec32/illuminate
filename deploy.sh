#!/bin/bash

echo "🚀 QrFlow Frontend - Vercel Deployment"
echo "======================================"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found!"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✓ Vercel CLI found"
echo ""

echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "📤 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Go to Vercel Dashboard"
echo "2. Navigate to Project Settings → Environment Variables"
echo "3. Add: VITE_API_URL = https://your-backend-url.com"
echo "4. Redeploy if needed"
echo ""
echo "🎉 Your QrFlow frontend is live!"
