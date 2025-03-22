import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebase_setup.js"; 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function loginUser(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Both email and password are required.");
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Login successful!");
    console.log(`Welcome back, ${user.displayName || "User"}!`);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}
loginUser("abc@gmail.com", "12345");
