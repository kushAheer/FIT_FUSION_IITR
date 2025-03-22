import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseConfig } from "./firebase_setup.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function signupUser(name, email, age, password) {
  try {
    if (!name || !email || !age || !password) {
      throw new Error("All fields (name, email, age, password) are required.");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });

    console.log("User signed up successfully!");
    console.log(`Welcome, ${name}!`);
  } catch (error) {
    console.error("Error signing up user:", error.message);
  }
}
signupUser("John Doe", "abc@gmail.com", 25, "12345");