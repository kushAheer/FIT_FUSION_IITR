import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseConfig } from "./firebase_setup.js"; // Import Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup function
async function signupUser(name, email, age, password) {
  try {
    // Validate required fields
    if (!name || !email || !age || !password) {
      throw new Error("All fields (name, email, age, password) are required.");
    }

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with name
    await updateProfile(user, { displayName: name });

    console.log("User signed up successfully!");
    console.log(`Welcome, ${name}!`);
  } catch (error) {
    console.error("Error signing up user:", error.message);
  }
}

// Example usage
signupUser("John Doe", "abc@gmail.com", 25, "12345");