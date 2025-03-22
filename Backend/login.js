import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebase_setup.js"; // Import Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
async function loginUser(email, password) {
  try {
    // Validate required fields
    if (!email || !password) {
      throw new Error("Both email and password are required.");
    }

    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Login successful!");
    console.log(`Welcome back, ${user.displayName || "User"}!`);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}

// Example usage
loginUser("abc@gmail.com", "12345");
