# DSA Preparation Tracker

A comprehensive web application designed to help developers systematically track, manage, and master Data Structure and Algorithm (DSA) preparation through structured problem solving, revision logging, weekly reviews, and progress analytics.

## 🎯 Features

- **Dashboard**: Real-time progress visualization across all DSA topics
- **Questions Tracker**: Manage 250+ curated LeetCode problems with difficulty levels and topic categorization
- **Planner**: Day-by-day study plan with customizable targets and progress tracking
- **Revision Logger**: Detailed tracking of problem revisits with attempt dates and mastery status
- **Weekly Reviews**: Comprehensive weekly analysis with statistics and notes
- **Patterns Reference**: Quick reference guide for common DSA patterns
- **Authentication**: Secure Google Sign-In integration
- **Cloud Sync**: Real-time data synchronization with Firebase

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Backend**: Firebase (Authentication & Firestore)
- **Build Tool**: Vite with HMR
- **Linting**: ESLint

## 📦 Installation

```bash
npm install
```

## 🏃 Getting Started

### Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm lint
```

## 🔧 Configuration

### Firebase Setup

Update the Firebase configuration in `src/App.jsx` with your project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 📊 Data Structure

- **questionsProgress**: Tracks individual problem solving status
- **revisionLogs**: Records problem revisit attempts and mastery
- **plannerProgress**: Stores daily study plan data
- **weeklyReviews**: Contains weekly analysis and reflection notes

## 🌐 Live Site

Visit the application at: [dsa.adnanahmad.tech](https://dsa.adnanahmad.tech)

## 👨‍💻 Owner & Development

**Complete Ownership, Development, Design & Deployment by:**

- **Adnan Ahmad**

This project was entirely conceptualized, developed, designed, and deployed by Adnan Ahmad.

## 📝 License

All rights reserved © Adnan Ahmad, 2025

## 🙋 Support

For issues, feature requests, or contributions, please contact the developer.
