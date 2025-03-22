import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";
import { firebaseConfig } from "./firebase_setup.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function bookSlot(userId, email, date, time) {
  try {
    const sanitizedEmail = email.replace(/\./g, "dot");

    // Reference to the slot
    const slotRef = ref(database, `slots/${date}/${time}`);
    const slotSnapshot = await get(slotRef);

    if (!slotSnapshot.exists()) {
      throw new Error("Slot does not exist.");
    }

    const slotData = slotSnapshot.val();

    // Check if the slot is available
    if (slotData.booked >= slotData.capacity) {
      throw new Error("Slot is fully booked.");
    }

    // Update the slot data
    const updatedSlot = {
      booked: slotData.booked + 1,
      users: {
        ...slotData.users,
        [sanitizedEmail]: email,
      },
    };
    await update(slotRef, updatedSlot);

    // Update the user's booked slots
    const userRef = ref(database, `users/${sanitizedEmail}/bookedSlots/${date}`);
    const userSnapshot = await get(userRef);
    const userSlots = userSnapshot.exists() ? userSnapshot.val() : [];

    await update(ref(database, `users/${sanitizedEmail}/bookedSlots`), {
      [date]: [...userSlots, time],
    });

    console.log("Slot booked successfully!");
  } catch (error) {
    console.error("Error booking slot:", error.message);
  }
}

// Example usage
bookSlot("user1", "user1@example.com", "2023-10-01", "10am");
