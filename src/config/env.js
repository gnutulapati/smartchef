// Environment Configuration
// This file handles all environment variables and provides fallbacks

// Gemini AI Configuration
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'PASTE_YOUR_API_KEY_HERE';

// Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Application Configuration
export const APP_CONFIG = {
  appId: import.meta.env.VITE_APP_ID || 'smartchef-demo',
  appName: import.meta.env.VITE_APP_NAME || 'SmartChef',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  devMode: import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV,
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true'
};

// Authentication Configuration
export const AUTH_CONFIG = {
  initialAuthToken: import.meta.env.VITE_INITIAL_AUTH_TOKEN || null
};

// API Endpoints
export const API_ENDPOINTS = {
  gemini: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`
};

// Development helpers
export const isDevelopment = APP_CONFIG.devMode;
export const isProduction = !APP_CONFIG.devMode;

// Validation function to check if required environment variables are set
export const validateEnvironment = () => {
  const errors = [];
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PASTE_YOUR_API_KEY_HERE') {
    errors.push('VITE_GEMINI_API_KEY is not set or still has placeholder value');
  }
  
  if (!FIREBASE_CONFIG.apiKey && !isDevelopment) {
    errors.push('Firebase configuration is incomplete');
  }
  
  if (errors.length > 0) {
    console.warn('Environment validation warnings:', errors);
    if (isDevelopment) {
      console.info('Running in development mode - some missing configurations will use fallbacks');
    }
  }
  
  return errors.length === 0;
};

// Global window variables setup (for backward compatibility)
export const setupGlobalVariables = () => {
  if (typeof window !== 'undefined') {
    // Set up global variables that the existing code expects
    window.__app_id = APP_CONFIG.appId;
    window.__firebase_config = FIREBASE_CONFIG;
    window.__initial_auth_token = AUTH_CONFIG.initialAuthToken;
    
    if (APP_CONFIG.debugMode) {
      console.log('Global variables set up:', {
        appId: window.__app_id,
        firebaseConfig: window.__firebase_config,
        hasAuthToken: !!window.__initial_auth_token
      });
    }
  }
};

// Initialize environment on module load
validateEnvironment();
setupGlobalVariables();
