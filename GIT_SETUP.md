# Git Setup Guide for SmartChef

This guide will help you set up Git for your SmartChef project and push it to a repository.

## 📋 Prerequisites

- Git installed on your system
- A GitHub/GitLab/Bitbucket account
- Your API keys and environment variables ready

## 🔧 Initial Git Setup

### 1. Initialize Git Repository

```bash
cd smartchef
git init
```

### 2. Configure Git (if not already done globally)

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 3. Set Up Environment Variables

**IMPORTANT:** Before committing, make sure your `.env` file is properly configured:

```bash
# Copy the example file
cp .env.example .env

# Edit with your actual values
# DO NOT commit the .env file - it's already in .gitignore
```

Your `.env` file should contain:
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key
# ... other environment variables
```

## 📁 Files Already Protected

The `.gitignore` file is already configured to protect:
- ✅ `.env` files (all variants)
- ✅ `node_modules/`
- ✅ Build outputs (`dist/`, `build/`)
- ✅ IDE files (`.vscode/`, `.idea/`)
- ✅ OS files (`.DS_Store`, `Thumbs.db`)
- ✅ Logs and cache files

## 🚀 Push to Repository

### Option 1: Create New Repository on GitHub

1. Go to GitHub and create a new repository
2. **DO NOT** initialize with README (we already have one)
3. Copy the repository URL

### Option 2: Use Existing Repository

If you already have a repository, get its URL.

### Add Remote and Push

```bash
# Add your repository as origin
git remote add origin https://github.com/yourusername/smartchef.git

# Add all files (except those in .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit: SmartChef AI Recipe Generator

- Dark theme React SPA with Tailwind CSS
- AI-powered recipe generation with Gemini API
- Weekly meal planning with Firebase sync
- 3D food elements and interactive animations
- Responsive design for all devices"

# Push to main branch
git push -u origin main
```

## 🔒 Security Checklist

Before pushing, verify these files are **NOT** being committed:

```bash
# Check what will be committed
git status

# These should NOT appear in the list:
# ❌ .env
# ❌ .env.local
# ❌ node_modules/
# ❌ Any files with API keys
```

If you see any sensitive files, add them to `.gitignore`:

```bash
echo "sensitive-file.js" >> .gitignore
git add .gitignore
git commit -m "Update gitignore"
```

## 🌿 Branch Strategy (Optional)

For collaborative development:

```bash
# Create development branch
git checkout -b develop

# Create feature branches
git checkout -b feature/new-feature-name

# When ready, merge back to main
git checkout main
git merge feature/new-feature-name
```

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples:
git commit -m "Add dark theme support to all components"
git commit -m "Fix recipe card visibility issues in dark mode"
git commit -m "Implement environment variable configuration"

# Include type prefixes:
git commit -m "feat: add meal plan export functionality"
git commit -m "fix: resolve API key configuration issue"
git commit -m "docs: update installation instructions"
```

## 🔄 Regular Workflow

```bash
# Pull latest changes
git pull origin main

# Make your changes
# ...

# Stage and commit
git add .
git commit -m "Descriptive commit message"

# Push changes
git push origin main
```

## 🆘 Troubleshooting

### If you accidentally committed sensitive files:

```bash
# Remove from Git but keep locally
git rm --cached .env
git commit -m "Remove .env from tracking"

# Add to gitignore if not already there
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

### If you need to change remote URL:

```bash
git remote set-url origin https://github.com/yourusername/new-repo.git
```

### If you get authentication errors:

1. Use personal access tokens instead of passwords
2. Set up SSH keys for easier authentication
3. Check your Git credentials

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## ✅ Final Checklist

- [ ] `.env` file is configured with your API keys
- [ ] `.env` file is in `.gitignore` (already done)
- [ ] No sensitive information in committed files
- [ ] Repository is created on your Git platform
- [ ] Initial commit is pushed successfully
- [ ] README.md is updated with your specific setup instructions

Your SmartChef project is now ready for collaborative development! 🎉
