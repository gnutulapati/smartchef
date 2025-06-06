#!/bin/bash

# SmartChef Git Setup Script
# This script will initialize Git and push to your repository

echo "🚀 Setting up Git for SmartChef..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the smartchef directory"
    exit 1
fi

# Initialize Git
echo "📁 Initializing Git repository..."
git init

# Configure Git (you can modify these)
echo "⚙️ Configuring Git..."
read -p "Enter your name: " git_name
read -p "Enter your email: " git_email
git config user.name "$git_name"
git config user.email "$git_email"

# Add all files
echo "📝 Adding files..."
git add .

# Check if .env is being tracked (it shouldn't be)
if git ls-files | grep -q "\.env$"; then
    echo "⚠️ Warning: .env file is being tracked. This shouldn't happen."
    echo "Make sure .env is in .gitignore"
fi

# Create commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: SmartChef AI Recipe Generator

- Dark theme React SPA with Tailwind CSS and shadcn/ui components
- AI-powered recipe generation using Gemini 2.0 Flash API
- Weekly meal planning with Firebase Firestore integration
- 3D food elements and interactive animations
- Responsive design optimized for all devices
- Environment variable configuration for secure API key management"

# Add remote repository
echo "🔗 Adding remote repository..."
git remote add origin https://github.com/gnutulapati/smartchef.git

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your SmartChef project is now on GitHub!"
echo "🌐 View it at: https://github.com/gnutulapati/smartchef"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Follow DEPLOYMENT.md to deploy your app"
echo "3. Share your amazing SmartChef app with the world! 🎉"
