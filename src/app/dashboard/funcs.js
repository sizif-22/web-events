import * as firestore from "firebase/firestore";
import { db } from "../firebase/firebase.user";

const cancelEvent = async (eventId, userId) => {
  try {
    // Get user document reference
    const userDocRef = firestore.doc(db, "user", userId);
    const userDoc = await firestore.getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const { events } = userData;

    if (!events) {
      throw new Error("No events found for user");
    }

    // Filter out the canceled event
    const updatedEvents = events.filter(event => event !== eventId);

    // Start a batch write to ensure atomicity
    const batch = firestore.writeBatch(db);

    // Delete the event document
    const eventDocRef = firestore.doc(db, "events", eventId);
    batch.delete(eventDocRef);

    // Update user's events array
    batch.update(userDocRef, {
      events: updatedEvents
    });

    // Commit the batch
    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error canceling event:", error.message);
    return false;
  }
};

export { cancelEvent };
