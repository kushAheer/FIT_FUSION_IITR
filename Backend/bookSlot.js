import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";
import { firebaseConfig } from "./firebase_setup.js";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function bookSlot(userId, email, date, time) {
  try {
    const sanitizedEmail = email.replace(/\./g, "dot");
    const slotRef = ref(database, `slots/${date}/${time}`);
    const slotSnapshot = await get(slotRef);
    if (!slotSnapshot.exists()) {
      throw new Error("Slot does not exist.");
    }
    const slotData = slotSnapshot.val();
    if (slotData.booked >= slotData.capacity) {
      throw new Error("Slot is fully booked.");
    }
    const updatedSlot = {
      booked: slotData.booked + 1,
      users: {
        ...slotData.users,
        [sanitizedEmail]: email,
      },
    };
    await update(slotRef, updatedSlot);
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
bookSlot("user1", "user1@example.com", "2023-10-01", "10am");