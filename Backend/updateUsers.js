import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";
import { firebaseConfig } from "./firebase_setup.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function addBookedSlotsToUsers() {
  try {
    const usersRef = ref(database, "users");
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      console.log("No users found.");
      return;
    }

    const users = usersSnapshot.val();

    for (const userKey in users) {
      const userRef = ref(database, `users/${userKey}`);
      await update(userRef, {
        bookedSlots: {}, 
      });
      console.log(`Updated user: ${userKey}`);
    }

    console.log("All users updated successfully!");
  } catch (error) {
    console.error("Error updating users:", error.message);
  }
}
addBookedSlotsToUsers();