# SmartChef Deployment Guide

This guide covers deploying your SmartChef application to various platforms.

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Automatic deployments from Git
- Built-in environment variable management
- Excellent performance for React apps
- Free tier available

**Steps:**
1. Push your code to GitHub (following GIT_SETUP.md)
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Configure environment variables in Vercel dashboard:
   - `VITE_GEMINI_API_KEY`
   - `VITE_FIREBASE_API_KEY` (if using Firebase)
   - Other Firebase config variables
5. Deploy!

### 2. Netlify

**Steps:**
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder to deploy
4. For continuous deployment, connect your Git repository
5. Set environment variables in Netlify dashboard

### 3. Firebase Hosting

**Steps:**
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```
3. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

### 4. GitHub Pages

**Steps:**
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/smartchef",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

## 🔧 Environment Variables for Production

### Required Variables:
```env
VITE_GEMINI_API_KEY=your_production_api_key
```

### Optional Variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_APP_ID=smartchef-production
```

## 🏗️ Build Configuration

### Vite Configuration
The `vite.config.js` is already configured for production builds:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🔒 Security Considerations

### API Key Security
- Never commit API keys to Git
- Use environment variables for all sensitive data
- Consider API key restrictions in Google Cloud Console
- Monitor API usage and set quotas

### Firebase Security Rules
If using Firebase, set up proper security rules:

```javascript
// Firestore rules example
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📊 Performance Optimization

### Already Implemented:
- ✅ Code splitting with React.lazy (if needed)
- ✅ Optimized images and assets
- ✅ Minified CSS and JavaScript
- ✅ Tree shaking for unused code

### Additional Optimizations:
```bash
# Analyze bundle size
npm install --save-dev vite-bundle-analyzer
```

## 🌍 Custom Domain Setup

### For Vercel:
1. Go to your project dashboard
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### For Netlify:
1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS

## 📱 PWA Configuration (Optional)

To make SmartChef a Progressive Web App:

1. Install Vite PWA plugin:
   ```bash
   npm install --save-dev vite-plugin-pwa
   ```

2. Update vite.config.js:
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa'
   
   export default defineConfig({
     plugins: [
       react(),
       VitePWA({
         registerType: 'autoUpdate',
         workbox: {
           globPatterns: ['**/*.{js,css,html,ico,png,svg}']
         },
         manifest: {
           name: 'SmartChef',
           short_name: 'SmartChef',
           description: 'AI-Powered Recipe Generator',
           theme_color: '#1e40af',
           icons: [
             {
               src: 'icon-192x192.png',
               sizes: '192x192',
               type: 'image/png'
             }
           ]
         }
       })
     ]
   })
   ```

## 🔍 Monitoring and Analytics

### Error Tracking
Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

### Analytics
- Google Analytics
- Vercel Analytics
- Netlify Analytics

## ✅ Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] API keys working in production
- [ ] Build completes without errors
- [ ] All features tested in production build
- [ ] Firebase security rules configured (if applicable)
- [ ] Custom domain configured (if applicable)
- [ ] Error tracking set up (optional)
- [ ] Analytics configured (optional)

## 🆘 Troubleshooting

### Common Issues:

**Build Fails:**
- Check for missing environment variables
- Ensure all dependencies are installed
- Check for TypeScript errors

**API Not Working:**
- Verify API keys are set correctly
- Check CORS settings
- Verify API quotas and limits

**Firebase Issues:**
- Check Firebase configuration
- Verify security rules
- Check authentication setup

**Routing Issues:**
- Configure redirects for SPA routing
- Set up 404 fallback to index.html

Your SmartChef app is ready for the world! 🚀
