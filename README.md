# Foodie Mobile Application

Foodie is a mobile application built with React Native and Expo. It allows users to browse restaurants, place orders, manage their cart, and handle payments through Razorpay. Restaurant details are stored on Sanity, a headless CMS, which can be managed externally. The app also features geolocation, address mapping, animated effects for delivery, and premium user handling, all styled with Tailwind for React Native. The state is managed using the Context API, and authentication is handled via Google and traditional username/password options.

## Features

- **Restaurant Management:**
  - Restaurants' details are stored and managed in Sanity CMS.
  - Fetch restaurant data dynamically from Sanity.

- **Order Management:**
  - Add to cart functionality.
  - Place orders for selected restaurants.
  - Integrated Razorpay payment gateway for order processing.

- **Geocoding & Delivery:**
  - Geolocation features for mapping user addresses.
  - Delivery tracking with animated effects.
  
- **Premium User Handling:**
  - Special offers and premium user benefits.
  - Differentiated experience for premium users.

- **Animated UI:**
  - Smooth loading animations.
  - Delivery status animations for user engagement.

- **Authentication:**
  - Google authentication.
  - Traditional username and password registration and login.

- **State Management:**
  - Context API to handle global state across the app.

- **UI Styling:**
  - Tailwind CSS for React Native to build a responsive and modern UI.

## Tech Stack

- **Frontend:**
  - React Native
  - Expo
  - Context API for state management
  - Tailwind CSS for styling (via `nativewind` or similar libraries)
  
- **CMS:**
  - Sanity (Headless CMS) for managing restaurant details.

- **APIs and SDKs:**
  - Razorpay API for payment processing.
  - Geocoding API for address mapping and delivery location services.

- **Authentication:**
  - Firebase Authentication (Google OAuth and traditional username/password).

- **Database:**
  - Firebase Realtime Database (or Firestore) to manage user details, orders, and premium status.

