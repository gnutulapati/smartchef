import React, { useState, useEffect } from 'react';
import { ChefHat, User, Clock, Utensils } from 'lucide-react';
import { setupAuthListener, getAppId } from './firebase/config';
import { APP_CONFIG } from './config/env';
import RecipeGenerator from './components/RecipeGenerator';
import MealPlanView from './components/MealPlanView';
import './App.css';

function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [appId] = useState(getAppId());
  
  // Main application state
  const [activeTab, setActiveTab] = useState('generator');
  const [mealPlan, setMealPlan] = useState({});

  // Initialize authentication on component mount
  useEffect(() => {
    console.log('Setting up authentication...');
    const unsubscribe = setupAuthListener((authenticatedUser) => {
      setUser(authenticatedUser);
      console.log('User state updated:', authenticatedUser?.uid);
    });

    // Cleanup subscription on unmount
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Show loading state while authentication is in progress
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">SmartChef</h2>
          <p className="text-gray-300">Initializing your cooking assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full opacity-30 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-30 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-800/80 backdrop-blur-md shadow-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ChefHat className="w-10 h-10 text-blue-400 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  SmartChef
                </h1>
                <p className="text-sm text-gray-300">AI-Powered Recipe Generator</p>
              </div>
            </div>

            {/* User ID Display */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 px-4 py-2 rounded-full border border-gray-600">
              <User className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-gray-200">
                Chef: {user.uid.substring(0, 8)}...
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 bg-gray-700/50 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('generator')}
              className={`relative py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'generator'
                  ? 'bg-gray-600 text-blue-400 shadow-lg transform scale-105'
                  : 'text-gray-300 hover:text-gray-100 hover:bg-gray-600/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-lg ${
                  activeTab === 'generator'
                    ? 'bg-blue-500/20'
                    : 'bg-transparent'
                }`}>
                  <Utensils className={`w-5 h-5 ${
                    activeTab === 'generator'
                      ? 'text-blue-400'
                      : 'text-gray-400'
                  }`} />
                </div>
                <span>Recipe Generator</span>
                {activeTab === 'generator' && (
                  <span className="text-xl animate-bounce">🍳</span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('mealplan')}
              className={`relative py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'mealplan'
                  ? 'bg-gray-600 text-purple-400 shadow-lg transform scale-105'
                  : 'text-gray-300 hover:text-gray-100 hover:bg-gray-600/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-lg ${
                  activeTab === 'mealplan'
                    ? 'bg-purple-500/20'
                    : 'bg-transparent'
                }`}>
                  <Clock className={`w-5 h-5 ${
                    activeTab === 'mealplan'
                      ? 'text-purple-400'
                      : 'text-gray-400'
                  }`} />
                </div>
                <span>Meal Plan</span>
                {activeTab === 'mealplan' && (
                  <span className="text-xl animate-bounce">📅</span>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-500 ease-in-out">
          {activeTab === 'generator' && (
            <div className="animate-fade-in-scale">
              <RecipeGenerator
                userId={user.uid}
                appId={appId}
                mealPlan={mealPlan}
                setMealPlan={setMealPlan}
              />
            </div>
          )}
          {activeTab === 'mealplan' && (
            <div className="animate-fade-in-scale">
              <MealPlanView
                userId={user.uid}
                appId={appId}
                mealPlan={mealPlan}
                setMealPlan={setMealPlan}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
