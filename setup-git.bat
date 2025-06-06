@echo off
REM SmartChef Git Setup Script for Windows
REM This script will initialize Git and push to your repository

echo 🚀 Setting up Git for SmartChef...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the smartchef directory
    pause
    exit /b 1
)

REM Initialize Git
echo 📁 Initializing Git repository...
git init

REM Configure Git
echo ⚙️ Configuring Git...
set /p git_name="Enter your name: "
set /p git_email="Enter your email: "
git config user.name "%git_name%"
git config user.email "%git_email%"

REM Add all files
echo 📝 Adding files...
git add .

REM Create commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: SmartChef AI Recipe Generator - Dark theme React SPA with AI-powered recipe generation using Gemini API, weekly meal planning with Firebase, 3D food elements and responsive design"

REM Add remote repository
echo 🔗 Adding remote repository...
git remote add origin https://github.com/gnutulapati/smartchef.git

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push -u origin main

echo ✅ Done! Your SmartChef project is now on GitHub!
echo 🌐 View it at: https://github.com/gnutulapati/smartchef
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Follow DEPLOYMENT.md to deploy your app
echo 3. Share your amazing SmartChef app with the world! 🎉
pause
