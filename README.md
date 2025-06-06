# SmartChef - AI Recipe Generator & Meal Planner

A modern React application that generates personalized recipes based on available ingredients and dietary preferences, with integrated meal planning functionality.

## Features

### 🎨 **Enhanced UI/UX Design**
- **3D Visual Elements**: Floating food emojis and interactive animations
- **Gradient Backgrounds**: Beautiful color transitions and glassmorphism effects
- **Smooth Animations**: Bounce, float, and slide-in animations for better engagement
- **Card Hover Effects**: 3D lift effects and shadow enhancements
- **Food-Specific Emojis**: Dynamic emoji selection based on recipe ingredients

### 🤖 **AI-Powered Recipe Generation**
- **Gemini 2.0 Flash API**: Advanced AI for personalized recipe creation
- **Ingredient-Based Suggestions**: Smart recipe matching from available ingredients
- **Dietary Preferences**: Support for vegetarian, vegan, gluten-free, keto, and more
- **Cooking Time Optimization**: Recipes tailored to your available time
- **Difficulty Levels**: Visual indicators for recipe complexity

### 📅 **Advanced Meal Planning**
- **Weekly Calendar View**: Beautiful 7-day meal planning interface
- **Meal Time Categories**: Breakfast, lunch, dinner, and snack organization
- **Real-time Sync**: Meal plans sync across devices using Firebase Firestore
- **Visual Recipe Cards**: Enhanced cards with food emojis and cooking details
- **Quick Actions**: Easy add/remove functionality with smooth animations

### 📱 **Responsive & Interactive**
- **Mobile-First Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and intuitive gestures
- **Loading States**: Beautiful spinners and progress indicators
- **Error Handling**: User-friendly error messages with helpful suggestions

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for beautiful, consistent icons
- **AI Integration**: Google Gemini 2.0 Flash API for recipe generation
- **Database**: Google Firestore for real-time data persistence
- **Authentication**: Firebase Authentication (anonymous or custom token)
- **Build Tool**: Vite for fast development and optimized builds

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd smartchef
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Copy the example environment file and configure your API keys:
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your actual values:
   ```env
   # Required: Gemini AI API Key
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

   # Optional: Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-firebase-app-id

   # Application Configuration
   VITE_APP_ID=smartchef-app-id
   ```

4. **Get API Keys**

   **Gemini API Key (Required for AI features):**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file as `VITE_GEMINI_API_KEY`

   **Firebase Configuration (Optional for real-time sync):**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Get your config from Project Settings
   - Add the values to your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## Usage Guide

### Generating Recipes

1. **Enter Ingredients**: Type available ingredients separated by commas
2. **Select Dietary Preferences**: Choose from various dietary options
3. **Set Cooking Time**: Specify maximum cooking time in minutes
4. **Generate**: Click the "Generate Recipes" button to get AI-powered suggestions

### Meal Planning

1. **Save Recipes**: Click "Save to Meal Plan" on any generated recipe
2. **Choose Schedule**: Select the day and meal time (Breakfast, Lunch, Dinner, Snack)
3. **View Plan**: Switch to the "Meal Plan" tab to see your weekly schedule
4. **Manage Meals**: Remove meals by clicking the trash icon

## Project Structure

```
smartchef/
├── src/
│   ├── components/
│   │   ├── BasicComponents.jsx    # Reusable UI components
│   │   ├── RecipeGenerator.jsx    # Recipe generation interface
│   │   ├── RecipeCard.jsx         # Individual recipe display
│   │   └── MealPlanView.jsx       # Weekly meal plan interface
│   ├── firebase/
│   │   └── config.js              # Firebase configuration and auth
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application-specific styles
│   ├── main.jsx                   # React application entry point
│   └── index.css                  # Global styles and Tailwind imports
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── postcss.config.js              # PostCSS configuration
```

## Key Components

- **App.jsx**: Main application with authentication and navigation
- **RecipeGenerator.jsx**: Handles ingredient input and API calls to Gemini
- **RecipeCard.jsx**: Displays individual recipes with save functionality
- **MealPlanView.jsx**: Shows weekly meal plan with real-time Firestore sync
- **BasicComponents.jsx**: Reusable UI components (buttons, inputs, cards, dialogs)

## Development Notes

- The app includes fallback recipes when the Gemini API is not configured
- Firebase integration is optional - the app works with local state if Firestore is unavailable
- All components are responsive and work on mobile devices
- Error handling is implemented for all API calls and database operations

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## License

This project is created for educational and demonstration purposes.
