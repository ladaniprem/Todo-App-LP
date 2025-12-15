
# Todo App LP

## Overview

Todo App LP is a modern, cross-platform Todo application built with React Native (Expo), TypeScript, and Convex as a backend. It features:

- Fast onboarding and animated intro
- Add, edit, complete, and delete todos
- Progress tracking and statistics
- Theming and beautiful gradients
- Persistent cloud sync (Convex backend)
- File-based navigation (Expo Router)
- Settings, preferences, and a "Danger Zone" for clearing all data

The app is designed for productivity, speed, and a delightful user experience.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

You can open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Environment Variables

**Do not commit your real .env file!**
Instead, use the provided `env.sample` as a template for required environment variables.

## App Flow

1. **Onboarding**: Animated intro and onboarding screens introduce the app's features.
2. **Main Tabs**: After onboarding, users land on the main tabs:
   - **Todos**: Add, edit, complete, and delete tasks. All data is synced to the cloud.
   - **Settings**: View progress stats, change preferences, and access the Danger Zone to clear all todos.
3. **Backend**: All todos are stored and managed via Convex, ensuring real-time sync and persistence.

## Project Structure

- `app/` — Main app screens and navigation (onboarding, tabs, todos, settings)
- `components/` — Reusable UI components (input, header, stats, etc.)
- `convex/` — Backend logic and schema (Convex functions)
- `assets/` — Images, fonts, and styles

## Diagrams

### App Navigation Flow

![App Navigation Flow](assets/images/2.svg)

### Main Features Overview

![Main Features](assets/images/3.png)

## Final App Screenshots

Below are screenshots of the final app:

![Screenshot 1](final%20app%20photo/IMG-20251215-WA0001.jpg)
![Screenshot 2](final%20app%20photo/IMG-20251215-WA0002.jpg)
![Screenshot 3](final%20app%20photo/IMG-20251215-WA0003.jpg)
![Screenshot 4](final%20app%20photo/IMG-20251215-WA0004.jpg)
![Screenshot 5](final%20app%20photo/IMG-20251215-WA0005.jpg)
![Screenshot 6](final%20app%20photo/IMG-20251215-WA0006.jpg)
