import React, { useState } from 'react';
import { Clock, Users, Plus, Calendar, Star, Heart, ChefHat } from 'lucide-react';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  BasicButton,
  BasicCard,
  BasicCardHeader,
  BasicCardTitle,
  BasicCardContent,
  BasicDialog,
  BasicDialogContent,
  BasicDialogHeader,
  BasicDialogTitle,
  BasicDialogFooter,
  BasicSelect
} from './BasicComponents';

const RecipeCard = ({ recipe, userId, appId, mealPlan, setMealPlan }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMealTime, setSelectedMealTime] = useState('Lunch');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  // Function to get appropriate food emoji based on recipe name and ingredients
  const getFoodEmoji = (recipeName, ingredients) => {
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
    return '🍽️'; // Default food emoji
  };

  // Function to get difficulty level based on cooking time and instructions
  const getDifficulty = (cookingTime, instructions) => {
    const instructionCount = instructions.length;
    if (cookingTime <= 15 && instructionCount <= 4) return { level: 'Easy', color: 'text-green-600', stars: 1 };
    if (cookingTime <= 30 && instructionCount <= 6) return { level: 'Medium', color: 'text-yellow-600', stars: 2 };
    return { level: 'Hard', color: 'text-red-600', stars: 3 };
  };

  // Save recipe to meal plan
  const saveRecipeToMealPlan = async () => {
    setSaving(true);
    setSaveError('');

    try {
      const mealKey = `${selectedDay}${selectedMealTime}`;
      
      // Update local state immediately for better UX
      const updatedMealPlan = {
        ...mealPlan,
        [mealKey]: recipe
      };
      setMealPlan(updatedMealPlan);

      // Save to Firestore if available
      if (db && userId && appId) {
        const docRef = doc(db, 'artifacts', appId, 'users', userId, 'mealPlans', 'currentWeek');
        await setDoc(docRef, updatedMealPlan, { merge: true });
        console.log('Recipe saved to meal plan:', mealKey, recipe.recipeName);
      } else {
        console.log('Firestore not available, using local state only');
      }

      setShowSaveDialog(false);
    } catch (error) {
      console.error('Error saving recipe to meal plan:', error);
      setSaveError('Failed to save recipe. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const foodEmoji = getFoodEmoji(recipe.recipeName, recipe.ingredients);
  const difficulty = getDifficulty(recipe.cookingTime, recipe.instructions);

  return (
    <>
      <BasicCard className="h-full flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border border-gray-600 shadow-xl">
        {/* Floating Food Emoji */}
        <div className="absolute -top-4 -right-4 text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 transform group-hover:rotate-12">
          {foodEmoji}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <BasicCardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <BasicCardTitle className="text-xl font-bold text-gray-100 group-hover:text-blue-300 transition-colors duration-300 flex items-center space-x-2">
              <span className="text-2xl">{foodEmoji}</span>
              <span>{recipe.recipeName}</span>
            </BasicCardTitle>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full hover:bg-red-900/30 transition-colors duration-200"
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  isLiked ? 'text-red-400 fill-current scale-110' : 'text-gray-400 hover:text-red-400'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1 bg-blue-800/50 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-blue-300">{recipe.cookingTime} min</span>
              </div>
              <div className="flex items-center space-x-1 bg-green-800/50 px-3 py-1 rounded-full">
                <Users className="w-4 h-4 text-green-400" />
                <span className="font-medium text-green-300">2-4 servings</span>
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="flex items-center space-x-1">
              <span className={`text-xs font-semibold ${difficulty.color.replace('text-', 'text-').replace('-600', '-400')}`}>{difficulty.level}</span>
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < difficulty.stars ? difficulty.color.replace('text-', 'text-').replace('-600', '-400') + ' fill-current' : 'text-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </BasicCardHeader>

        <BasicCardContent className="flex-1 flex flex-col space-y-6 relative z-10">
          {/* Ingredients */}
          <div className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 p-4 rounded-xl border border-orange-700/50 backdrop-blur-sm">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center space-x-2">
              <span className="text-lg">🥘</span>
              <span>Ingredients</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-700/70 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span className="text-sm text-gray-200 font-medium">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-4 rounded-xl border border-blue-700/50 flex-1 backdrop-blur-sm">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center space-x-2">
              <span className="text-lg">👨‍🍳</span>
              <span>Instructions</span>
            </h4>
            <div className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-gray-700/70 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-200 leading-relaxed">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Save to Meal Plan Button */}
          <BasicButton
            onClick={() => setShowSaveDialog(true)}
            className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border-0"
          >
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Save to Meal Plan</span>
              <Plus className="w-4 h-4" />
            </div>
          </BasicButton>
        </BasicCardContent>
      </BasicCard>

      {/* Save to Meal Plan Dialog */}
      <BasicDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <BasicDialogContent>
          <BasicDialogHeader>
            <BasicDialogTitle>Save to Meal Plan</BasicDialogTitle>
          </BasicDialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-300">
              Choose when you'd like to schedule "{recipe.recipeName}"
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Day
                </label>
                <BasicSelect
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {days.map(day => (
                    <option key={day} value={day} className="bg-gray-800 text-gray-100">{day}</option>
                  ))}
                </BasicSelect>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Meal Time
                </label>
                <BasicSelect
                  value={selectedMealTime}
                  onChange={(e) => setSelectedMealTime(e.target.value)}
                >
                  {mealTimes.map(time => (
                    <option key={time} value={time} className="bg-gray-800 text-gray-100">{time}</option>
                  ))}
                </BasicSelect>
              </div>
            </div>

            {saveError && (
              <div className="bg-red-900/30 border border-red-600/50 rounded-md p-3 backdrop-blur-sm">
                <p className="text-red-300 text-sm">{saveError}</p>
              </div>
            )}
          </div>

          <BasicDialogFooter>
            <BasicButton
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
              disabled={saving}
            >
              Cancel
            </BasicButton>
            <BasicButton
              onClick={saveRecipeToMealPlan}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Recipe'}
            </BasicButton>
          </BasicDialogFooter>
        </BasicDialogContent>
      </BasicDialog>
    </>
  );
};

export default RecipeCard;
