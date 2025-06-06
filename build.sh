#!/bin/bash

# Render build script for SmartChef
echo "🚀 Starting SmartChef build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --include=dev

# Build the application
echo "🏗️ Building application..."
npm run build

# Verify build
echo "✅ Build verification..."
if [ -d "dist" ]; then
    echo "✅ Build successful! dist directory created."
    ls -la dist/
else
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

echo "🎉 SmartChef build completed successfully!"
