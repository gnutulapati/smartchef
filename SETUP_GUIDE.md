# SmartChef Setup Guide

## Quick Start (If Node.js is available)

### 1. Enable PowerShell Script Execution (Windows)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Install Dependencies
```bash
cd smartchef
npm install
```

### 3. Configure Gemini API (Optional but Recommended)
1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open `src/components/RecipeGenerator.jsx`
3. Replace `YOUR_API_KEY` on line ~67 with your actual API key:
   ```javascript
   const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_ACTUAL_API_KEY', {
   ```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to `http://localhost:3000`

## Alternative Setup (Without Node.js)

If you can't run the full React application, you can:

1. **View the Demo**: Open `demo.html` in your browser to see the UI design
2. **Install Node.js**: Download from [nodejs.org](https://nodejs.org/)
3. **Use Online IDE**: Copy the code to CodeSandbox or StackBlitz

## Firebase Configuration (Optional)

The app is designed to work with global Firebase variables:

```javascript
// These should be available globally
window.__firebase_config = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

window.__app_id = "your-unique-app-id";
window.__initial_auth_token = "optional-custom-token";
```

If these aren't available, the app will:
- Use fallback Firebase configuration
- Store meal plans in local state only
- Generate a random user ID

## Features Implemented

✅ **Recipe Generation Form**
- Ingredient input with textarea
- Dietary preference dropdown
- Cooking time input
- Generate button with loading state

✅ **AI Integration**
- Gemini 2.0 Flash API integration
- Structured JSON response schema
- Fallback demo recipes when API not configured
- Error handling for API failures

✅ **Recipe Display**
- Beautiful recipe cards with ingredients and instructions
- Cooking time and serving information
- Save to meal plan functionality

✅ **Meal Planning**
- Weekly calendar view (Monday-Sunday)
- Four meal times per day (Breakfast, Lunch, Dinner, Snack)
- Save/remove recipes from meal plan
- Real-time Firestore synchronization

✅ **User Interface**
- Modern, responsive design with Tailwind CSS
- Tab navigation between Recipe Generator and Meal Plan
- Loading states and error messages
- Mobile-friendly layout

✅ **Firebase Integration**
- Anonymous authentication
- Real-time Firestore sync for meal plans
- Fallback to local storage when Firebase unavailable
- User ID display in header

✅ **Error Handling**
- API call error handling
- Firebase connection error handling
- User-friendly error messages
- Graceful fallbacks

## Project Structure

```
smartchef/
├── src/
│   ├── components/
│   │   ├── BasicComponents.jsx    # UI component library
│   │   ├── RecipeGenerator.jsx    # Main recipe generation interface
│   │   ├── RecipeCard.jsx         # Individual recipe display
│   │   └── MealPlanView.jsx       # Weekly meal plan interface
│   ├── firebase/
│   │   └── config.js              # Firebase setup and authentication
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles with Tailwind
├── demo.html                      # Static demo preview
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── README.md                      # Detailed documentation
```

## Next Steps

1. **Test the Application**: Try generating recipes and saving them to the meal plan
2. **Configure APIs**: Add your Gemini API key for AI-powered recipe generation
3. **Customize**: Modify dietary options, styling, or add new features
4. **Deploy**: Build for production with `npm run build`

## Troubleshooting

**PowerShell Execution Policy Error**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Node.js Not Found**:
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

**API Key Issues**:
- Ensure your Gemini API key is valid
- Check the API endpoint URL is correct
- The app will use fallback recipes if the API fails

**Firebase Connection Issues**:
- The app works without Firebase (local storage only)
- Check your Firebase configuration if using real-time sync

## Support

The application includes comprehensive error handling and fallback mechanisms, so it should work even if some services are unavailable. Check the browser console for detailed error messages if you encounter issues.
