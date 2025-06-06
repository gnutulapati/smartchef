import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Trash2, Plus, Star, ChefHat, Utensils } from 'lucide-react';
import { doc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  BasicCard,
  BasicCardHeader,
  BasicCardTitle,
  BasicCardContent,
  BasicButton
} from './BasicComponents';

const MealPlanView = ({ userId, appId, mealPlan, setMealPlan }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  // Function to get meal time emoji
  const getMealTimeEmoji = (mealTime) => {
    switch (mealTime) {
      case 'Breakfast': return '🌅';
      case 'Lunch': return '☀️';
      case 'Dinner': return '🌙';
      case 'Snack': return '🍪';
      default: return '🍽️';
    }
  };

  // Function to get day emoji
  const getDayEmoji = (day) => {
    switch (day) {
      case 'Monday': return '💪';
      case 'Tuesday': return '🔥';
      case 'Wednesday': return '⚡';
      case 'Thursday': return '🚀';
      case 'Friday': return '🎉';
      case 'Saturday': return '🌟';
      case 'Sunday': return '😌';
      default: return '📅';
    }
  };

  // Function to get food emoji based on recipe name and ingredients
  const getFoodEmoji = (recipeName, ingredients) => {
    if (!recipeName || !ingredients) return '🍽️';

    const name = recipeName.toLowerCase();
    const ingredientList = ingredients.join(' ').toLowerCase();

    if (name.includes('chicken') || ingredientList.includes('chicken')) return '🍗';
    if (name.includes('beef') || ingredientList.includes('beef')) return '🥩';
    if (name.includes('fish') || ingredientList.includes('fish') || name.includes('salmon')) return '🐟';
    if (name.includes('pasta') || ingredientList.includes('pasta')) return '🍝';
    if (name.includes('pizza')) return '🍕';
    if (name.includes('soup') || name.includes('broth')) return '🍲';
    if (name.includes('salad') || ingredientList.includes('lettuce')) return '🥗';
    if (name.includes('sandwich') || name.includes('burger')) return '🥪';
    if (name.includes('rice') || ingredientList.includes('rice')) return '🍚';
    if (name.includes('stir') || name.includes('fry')) return '🥘';
    if (name.includes('curry')) return '🍛';
    if (name.includes('taco') || name.includes('mexican')) return '🌮';
    if (name.includes('breakfast') || ingredientList.includes('egg')) return '🍳';
    if (name.includes('dessert') || name.includes('cake') || name.includes('sweet')) return '🍰';
    if (ingredientList.includes('vegetable') || ingredientList.includes('broccoli')) return '🥦';
    return '🍽️';
  };

  // Set up real-time listener for meal plan data
  useEffect(() => {
    if (!userId || !appId) {
      setLoading(false);
      return;
    }

    let unsubscribe = () => {};

    if (db) {
      try {
        const docRef = doc(db, 'artifacts', appId, 'users', userId, 'mealPlans', 'currentWeek');
        
        unsubscribe = onSnapshot(docRef, 
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              setMealPlan(data || {});
              console.log('Meal plan updated from Firestore:', data);
            } else {
              setMealPlan({});
              console.log('No meal plan document found');
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error listening to meal plan:', error);
            setError('Failed to load meal plan');
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up meal plan listener:', error);
        setError('Failed to connect to meal plan');
        setLoading(false);
      }
    } else {
      console.log('Firestore not available, using local state only');
      setLoading(false);
    }

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [userId, appId, setMealPlan]);

  // Remove recipe from meal plan
  const removeRecipe = async (day, mealTime) => {
    try {
      const mealKey = `${day}${mealTime}`;
      
      // Update local state immediately
      const updatedMealPlan = { ...mealPlan };
      delete updatedMealPlan[mealKey];
      setMealPlan(updatedMealPlan);

      // Update Firestore if available
      if (db && userId && appId) {
        const docRef = doc(db, 'artifacts', appId, 'users', userId, 'mealPlans', 'currentWeek');
        await updateDoc(docRef, {
          [mealKey]: deleteField()
        });
        console.log('Recipe removed from meal plan:', mealKey);
      }
    } catch (error) {
      console.error('Error removing recipe:', error);
      setError('Failed to remove recipe');
    }
  };

  // Get recipe for specific day and meal time
  const getRecipe = (day, mealTime) => {
    const mealKey = `${day}${mealTime}`;
    return mealPlan[mealKey] || null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-800 border-t-blue-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Preparing Your Meal Plan</h3>
          <p className="text-gray-300">Organizing your delicious week ahead...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Floating Food Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-32 right-16 text-4xl animate-float opacity-10">🥗</div>
        <div className="absolute bottom-32 left-16 text-5xl animate-bounce-slow opacity-15">🍝</div>
        <div className="absolute top-1/2 right-1/4 text-3xl animate-pulse opacity-10">🍲</div>
      </div>

      {/* Header */}
      <div className="relative text-center py-8 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-orange-900/30 rounded-3xl shadow-xl border border-purple-700/50 overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-orange-800/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <span className="text-4xl animate-bounce">📅</span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Weekly Meal Plan
            </h2>
            <span className="text-4xl animate-bounce">🍽️</span>
          </div>
          <p className="text-lg text-gray-300">Your personalized culinary journey for the week</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-600/50 rounded-md p-4 backdrop-blur-sm">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Meal Plan Grid */}
      <div className="relative z-10">
        <div className="meal-plan-grid gap-6">
          {days.map((day, dayIndex) => (
            <BasicCard
              key={day}
              className="h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
              style={{
                animationDelay: `${dayIndex * 100}ms`,
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              {/* Day Header */}
              <BasicCardHeader className="pb-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 text-6xl opacity-20 transform translate-x-4 -translate-y-2">
                  {getDayEmoji(day)}
                </div>
                <BasicCardTitle className="text-lg text-center font-bold relative z-10 flex items-center justify-center space-x-2 text-white">
                  <span>{getDayEmoji(day)}</span>
                  <span>{day}</span>
                </BasicCardTitle>
              </BasicCardHeader>

              <BasicCardContent className="space-y-4 p-4">
                {mealTimes.map((mealTime, mealIndex) => {
                  const recipe = getRecipe(day, mealTime);
                  const foodEmoji = recipe ? getFoodEmoji(recipe.recipeName, recipe.ingredients) : null;

                  return (
                    <div
                      key={mealTime}
                      className={`border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg ${
                        recipe
                          ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-600/50 hover:border-green-500/70 backdrop-blur-sm'
                          : 'bg-gradient-to-r from-gray-700/30 to-gray-600/30 border-gray-600/50 hover:border-gray-500/70 border-dashed backdrop-blur-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-sm flex items-center space-x-2">
                          <span className="text-lg">{getMealTimeEmoji(mealTime)}</span>
                          <span className="text-gray-200">{mealTime}</span>
                        </h4>
                        {recipe && (
                          <BasicButton
                            variant="outline"
                            size="sm"
                            onClick={() => removeRecipe(day, mealTime)}
                            className="p-1 h-7 w-7 bg-red-900/30 hover:bg-red-800/50 border-red-600/50 hover:border-red-500/70 rounded-full"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </BasicButton>
                        )}
                      </div>

                      {recipe ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{foodEmoji}</span>
                            <p className="font-bold text-sm text-gray-100 flex-1">{recipe.recipeName}</p>
                          </div>
                          <div className="flex items-center space-x-3 text-xs">
                            <div className="flex items-center space-x-1 bg-blue-800/50 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3 text-blue-400" />
                              <span className="text-blue-300 font-medium">{recipe.cookingTime} min</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-orange-800/50 px-2 py-1 rounded-full">
                              <Utensils className="w-3 h-3 text-orange-400" />
                              <span className="text-orange-300 font-medium">Ready</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-300 bg-gray-700/70 p-2 rounded-lg">
                            <span className="font-medium">Ingredients:</span> {recipe.ingredients.slice(0, 2).join(', ')}
                            {recipe.ingredients.length > 2 && ` +${recipe.ingredients.length - 2} more`}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="text-3xl mb-2 opacity-40">{getMealTimeEmoji(mealTime)}</div>
                          <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-400 font-medium">No meal planned</p>
                          <p className="text-xs text-gray-500">Add a recipe from the generator</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </BasicCardContent>
            </BasicCard>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-900/30 border border-blue-600/50 rounded-md p-4 backdrop-blur-sm">
        <div className="flex items-start space-x-2">
          <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-300 mb-1">How to use your meal plan</h3>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Generate recipes in the Recipe Generator tab</li>
              <li>• Click "Save to Meal Plan" on any recipe card</li>
              <li>• Choose the day and meal time to schedule your recipe</li>
              <li>• Your meal plan syncs automatically across devices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BasicCard>
          <BasicCardContent className="text-center py-4">
            <div className="text-2xl font-bold text-blue-400">
              {Object.keys(mealPlan).length}
            </div>
            <p className="text-sm text-gray-300">Meals Planned</p>
          </BasicCardContent>
        </BasicCard>

        <BasicCard>
          <BasicCardContent className="text-center py-4">
            <div className="text-2xl font-bold text-green-400">
              {days.filter(day =>
                mealTimes.some(mealTime => getRecipe(day, mealTime))
              ).length}
            </div>
            <p className="text-sm text-gray-300">Days Covered</p>
          </BasicCardContent>
        </BasicCard>

        <BasicCard>
          <BasicCardContent className="text-center py-4">
            <div className="text-2xl font-bold text-purple-400">
              {Object.values(mealPlan).reduce((total, recipe) =>
                total + (recipe.cookingTime || 0), 0
              )}
            </div>
            <p className="text-sm text-gray-300">Total Cook Time (min)</p>
          </BasicCardContent>
        </BasicCard>
      </div>
    </div>
  );
};

export default MealPlanView;
