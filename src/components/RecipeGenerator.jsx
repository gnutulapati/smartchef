import React, { useState } from 'react';
import { Search, Clock, Users, ChefHat, Sparkles, Utensils, Star } from 'lucide-react';
import { API_ENDPOINTS } from '../config/env';
import {
  BasicButton,
  BasicInput,
  BasicTextarea,
  BasicSelect,
  BasicCard,
  BasicCardHeader,
  BasicCardTitle,
  BasicCardContent
} from './BasicComponents';
import RecipeCard from './RecipeCard';

const RecipeGenerator = ({ userId, appId, mealPlan, setMealPlan }) => {
  // Form state
  const [ingredients, setIngredients] = useState('');
  const [dietary, setDietary] = useState('None');
  const [cookingTime, setCookingTime] = useState('30');
  
  // Recipe generation state
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dietary options
  const dietaryOptions = [
    'None',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Keto',
    'Dairy-Free',
    'Low-Carb',
    'Mediterranean'
  ];

  // Generate recipes using Gemini API
  const generateRecipes = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedRecipes([]);

    try {
      // Construct the prompt for Gemini API
      const prompt = `Generate 3 unique recipes based on the following criteria:
      
Ingredients available: ${ingredients}
Dietary preference: ${dietary}
Maximum cooking time: ${cookingTime} minutes

Please provide recipes that:
1. Use primarily the ingredients listed (can include common pantry staples)
2. Respect the dietary restrictions specified
3. Can be prepared within the time limit
4. Include clear step-by-step instructions
5. Are practical for home cooking

Return the response as a JSON array with exactly this structure:
[
  {
    "recipeName": "Recipe Name",
    "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "cookingTime": 25
  }
]

Make sure the JSON is valid and contains exactly 3 recipes.`;

      // Make API call to Gemini
      const response = await fetch(API_ENDPOINTS.gemini, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  recipeName: { type: "string" },
                  ingredients: {
                    type: "array",
                    items: { type: "string" }
                  },
                  instructions: {
                    type: "array",
                    items: { type: "string" }
                  },
                  cookingTime: { type: "number" }
                },
                required: ["recipeName", "ingredients", "instructions", "cookingTime"]
              }
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the response
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const recipesText = data.candidates[0].content.parts[0].text;
        const recipes = JSON.parse(recipesText);
        
        if (Array.isArray(recipes) && recipes.length > 0) {
          setGeneratedRecipes(recipes);
          console.log('Generated recipes:', recipes);
        } else {
          throw new Error('Invalid recipe format received');
        }
      } else {
        throw new Error('No recipes generated');
      }

    } catch (error) {
      console.error('Error generating recipes:', error);
      
      // For demo purposes, provide fallback recipes
      const fallbackRecipes = [
        {
          recipeName: "Quick Stir-Fry",
          ingredients: ingredients.split(',').map(i => i.trim()).slice(0, 5),
          instructions: [
            "Heat oil in a large pan or wok over medium-high heat",
            "Add your main ingredients and cook for 3-4 minutes",
            "Season with salt, pepper, and any available spices",
            "Stir frequently until ingredients are tender",
            "Serve hot over rice or noodles"
          ],
          cookingTime: parseInt(cookingTime) || 30
        },
        {
          recipeName: "Simple Soup",
          ingredients: ingredients.split(',').map(i => i.trim()).slice(0, 4).concat(["broth", "herbs"]),
          instructions: [
            "Bring broth to a boil in a large pot",
            "Add your main ingredients",
            "Simmer for 15-20 minutes until tender",
            "Season to taste with herbs and spices",
            "Serve hot with bread or crackers"
          ],
          cookingTime: Math.min(parseInt(cookingTime) || 30, 25)
        }
      ];
      
      setGeneratedRecipes(fallbackRecipes);
      setError('Using demo recipes (Gemini API not configured). Please add your API key to use AI-generated recipes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Floating Food Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20">🍅</div>
        <div className="absolute top-40 right-20 text-5xl animate-pulse opacity-15">🥕</div>
        <div className="absolute bottom-40 left-20 text-7xl animate-spin-slow opacity-10">🧄</div>
        <div className="absolute top-60 left-1/3 text-4xl animate-float opacity-20">🥬</div>
        <div className="absolute bottom-60 right-1/4 text-6xl animate-bounce-slow opacity-15">🍗</div>
        <div className="absolute top-1/3 right-10 text-5xl animate-pulse opacity-10">🧅</div>
      </div>

      {/* Hero Section */}
      <div className="relative text-center py-12 bg-gradient-to-r from-orange-900/30 via-yellow-900/30 to-red-900/30 rounded-3xl shadow-2xl border border-orange-800/50 overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-800/20 to-red-800/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <ChefHat className="w-16 h-16 text-orange-400 animate-bounce" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            AI Recipe Generator
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Transform your ingredients into delicious meals with the power of AI
          </p>
        </div>
      </div>

      {/* Recipe Generation Form */}
      <BasicCard className="relative overflow-hidden shadow-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-800/30 to-purple-800/30 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <BasicCardHeader>
          <BasicCardTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Your Perfect Recipe
            </span>
          </BasicCardTitle>
        </BasicCardHeader>
        <BasicCardContent className="space-y-8 relative z-10">
          {/* Ingredients Input */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
              <span className="text-2xl">🥘</span>
              <span>Available Ingredients</span>
            </label>
            <div className="relative">
              <BasicTextarea
                placeholder="Enter ingredients separated by commas (e.g., chicken, broccoli, rice, garlic, onion)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={4}
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-xl border-2 focus:border-blue-400 bg-gradient-to-r from-gray-800 to-gray-700"
              />
              <div className="absolute top-2 right-2 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                ✨ Be creative!
              </div>
            </div>
          </div>

          {/* Dietary Preferences and Cooking Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <span>Dietary Preference</span>
              </label>
              <BasicSelect
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-green-400 bg-gradient-to-r from-gray-800 to-gray-700"
              >
                {dietaryOptions.map(option => (
                  <option key={option} value={option} className="bg-gray-800 text-gray-100">{option}</option>
                ))}
              </BasicSelect>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
                <span className="text-2xl">⏰</span>
                <span>Max Cooking Time (minutes)</span>
              </label>
              <BasicInput
                type="number"
                placeholder="30"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                min="5"
                max="180"
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-orange-400 bg-gradient-to-r from-gray-800 to-gray-700"
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-4">
            <BasicButton
              onClick={generateRecipes}
              disabled={loading || !ingredients.trim()}
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              {loading ? (
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-6 w-6 border border-white opacity-20"></div>
                  </div>
                  <span className="text-lg">Creating Magic...</span>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              ) : (
                <div className="flex items-center space-x-3 relative z-10">
                  <Star className="w-5 h-5 animate-pulse" />
                  <span className="text-lg">Generate AI Recipes</span>
                  <Search className="w-5 h-5" />
                </div>
              )}
            </BasicButton>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-2 border-amber-600/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h4 className="font-semibold text-amber-300 mb-1">Notice</h4>
                  <p className="text-amber-200 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
        </BasicCardContent>
      </BasicCard>

      {/* Generated Recipes */}
      {generatedRecipes.length > 0 && (
        <div className="relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 rounded-3xl opacity-50 animate-pulse backdrop-blur-sm"></div>

          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <span className="text-4xl animate-bounce">🎉</span>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your AI-Generated Recipes
                </h2>
                <span className="text-4xl animate-bounce">✨</span>
              </div>
              <p className="text-lg text-gray-300">
                Delicious recipes crafted just for you!
              </p>
            </div>

            <div className="recipe-grid">
              {generatedRecipes.map((recipe, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-500 hover:scale-105"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  <RecipeCard
                    recipe={recipe}
                    userId={userId}
                    appId={appId}
                    mealPlan={mealPlan}
                    setMealPlan={setMealPlan}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
