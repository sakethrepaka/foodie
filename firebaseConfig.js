// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCuArBmm3fbwsjYJry4tB7HzeWH2v1khQs",
  authDomain: "foodie-auth-7c7cf.firebaseapp.com",
  projectId: "foodie-auth-7c7cf",
  storageBucket: "foodie-auth-7c7cf.appspot.com",
  messagingSenderId: "255356633795",
  appId: "1:255356633795:web:b4056a0e50bb1c176fd876"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
