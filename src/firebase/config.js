import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_CONFIG, APP_CONFIG, AUTH_CONFIG } from '../config/env';

// Firebase configuration and initialization
let firebaseApp = null;
let db = null;
let auth = null;

// Initialize Firebase only once
export const initializeFirebase = () => {
  try {
    // Use environment configuration first, then fall back to global variables
    let config = FIREBASE_CONFIG;

    // Check if we have a valid Firebase config
    if (!config.apiKey && typeof window !== 'undefined' && window.__firebase_config) {
      console.log('Using Firebase config from global variables...');
      config = window.__firebase_config;
    }

    // If still no valid config, use fallback for development
    if (!config.apiKey) {
      console.warn('No Firebase config found. Using fallback configuration for development.');
      config = {
        apiKey: "demo-api-key",
        authDomain: "demo-project.firebaseapp.com",
        projectId: "demo-project",
        storageBucket: "demo-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "demo-app-id"
      };
    }

    if (!firebaseApp) {
      firebaseApp = initializeApp(config);
      db = getFirestore(firebaseApp);
      auth = getAuth(firebaseApp);
      console.log('Firebase initialized successfully with config:', config.projectId);
    }

    return { firebaseApp, db, auth };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return { firebaseApp: null, db: null, auth: null };
  }
};

// Authentication helper functions
export const authenticateUser = async () => {
  try {
    const { auth } = initializeFirebase();
    
    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }

    // Check if custom token is available
    const customToken = AUTH_CONFIG.initialAuthToken ||
                       (typeof window !== 'undefined' && window.__initial_auth_token);

    if (customToken) {
      console.log('Signing in with custom token...');
      const userCredential = await signInWithCustomToken(auth, customToken);
      console.log('Custom token authentication successful:', userCredential.user.uid);
      return userCredential.user;
    } else {
      console.log('Signing in anonymously...');
      const userCredential = await signInAnonymously(auth);
      console.log('Anonymous authentication successful:', userCredential.user.uid);
      return userCredential.user;
    }
  } catch (error) {
    console.error('Authentication failed:', error);
    // Fallback to random UUID if authentication fails
    const fallbackUserId = crypto.randomUUID();
    console.log('Using fallback user ID:', fallbackUserId);
    return { uid: fallbackUserId };
  }
};

// Set up auth state listener
export const setupAuthListener = (callback) => {
  try {
    const { auth } = initializeFirebase();
    
    if (!auth) {
      console.warn('Firebase auth not available, using fallback user ID');
      callback({ uid: crypto.randomUUID() });
      return () => {}; // Return empty unsubscribe function
    }

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', user.uid);
        callback(user);
      } else {
        console.log('User not authenticated, attempting authentication...');
        authenticateUser().then(callback);
      }
    });
  } catch (error) {
    console.error('Error setting up auth listener:', error);
    callback({ uid: crypto.randomUUID() });
    return () => {};
  }
};

// Get app ID from environment or global variables
export const getAppId = () => {
  return APP_CONFIG.appId ||
         (typeof window !== 'undefined' && window.__app_id) ||
         'demo-app-id';
};

// Export initialized instances
export { firebaseApp, db, auth };
