# One More Fitness App - Technical Overview

## 🛠️ Core Technologies

### React Native & Expo

- Built with React Native 0.76.6 and Expo SDK 52
- Uses Expo Router for file-based routing
- Implements Expo's specialized modules:
  - expo-video for video playback
  - expo-image for optimized image loading
  - expo-linear-gradient for UI effects
  - expo-haptics for tactile feedback

### UI Framework

- Tamagui as the primary UI framework (v1.123.0)
- Includes multiple Tamagui packages for:
  - Animations
  - Icons
  - Theming
  - Typography (Inter font)

### State Management & Data Fetching

- TanStack Query (React Query) v5.64.2 for:
  - API data fetching
  - Infinite scrolling
  - Cache management
- Axios for HTTP requests

### Animations & Gestures

- React Native Reanimated ~3.16.1
- React Native Gesture Handler ~2.20.2
- Moti for declarative animations

## 📱 Development Setup

1. Install dependencies:

```bash
npm install
```

2. Start development:

```bash
# For iOS
npm run ios

# For Android
npm run android

# For web (experimental)
npm run web
```

## 🧪 Testing

The project uses Jest with jest-expo preset:

```bash
npm test
```

## 📦 Key Dependencies

### Frontend Framework

- React Native 0.76.6
- Expo SDK 52
- TypeScript

### UI & Styling

- Tamagui UI Framework
- Expo Linear Gradient
- React Native Reanimated
- Moti for animations
- Expo Image for optimized image loading

### Video & Media

- Expo Video with features:
  - Background playback
  - Picture in Picture
  - Video caching
  - Next video preloading

### State Management & Data Fetching

- TanStack Query (React Query)
- Axios for HTTP requests

### Navigation & Routing

- Expo Router
- React Navigation

### Performance & Optimization

- React Native Gesture Handler
- Expo Image caching
- FlashList for optimized lists

### Development & Testing

- Jest with Expo preset
- ESLint with TanStack Query plugin
- TypeScript for type safety

### Native Features

- Expo Haptics
- Expo Constants
- Expo Status Bar
- Safe Area Context

### Additional Tools

- Expo Font for custom typography
- Expo Splash Screen
- Expo Web Browser
- Lucide Icons
- React Native SVG
- React Native WebView

## 🏗️ Project Structure

The application follows a modular architecture with:

- `/app` - File-based routing using Expo Router
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/api` - API integration layer
- `/types` - TypeScript type definitions
- `/assets` - Static assets and resources

## 🔧 Configuration

The project includes configuration for:

- TypeScript
- Jest testing
- Babel with environment variables support
- ESLint with TanStack Query plugin
- Native platform-specific settings (iOS/Android)

## 📱 Platform Support

- iOS: Minimum deployment target 15.1
- Android: Configured with modern architecture support
- Web: Experimental support with Metro bundler

## 🚀 Development Features

- Hot reloading
- Development client support
- Debug and release configurations
- Native module linking
- Type checking and linting
