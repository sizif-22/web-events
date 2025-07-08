import { NextResponse } from "next/server";
import { db } from "@/app/firebase/firestore.events";
import {
  doc,
  collection,
  deleteDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { isWithinMinutes } from "@/utils/dateUtils.cjs";
export async function POST(request) {
  try {
    const { email, eventId } = await request.json();
    if (!email || !eventId) {
      return NextResponse.json(
        { error: "Email and event ID are required" },
        { status: 400 }
      );
    }
    // Check participants collection
    const participantsRef = collection(
      doc(db, "events", eventId),
      "participants"
    );
    const participantsQuery = query(participantsRef, where("0", "==", email));
    const existingParticipant = await getDocs(participantsQuery);

    if (!existingParticipant.empty) {
      return res.json({
        exists: true,
        collection: "participants",
        message: "Email already registered for this event",
      });
    }

    // Updated: Check pending participants sub-collection
    const pendingRef = collection(
      doc(db, "events", eventId),
      "pendingParticipants"
    );
    const pendingQuery = query(pendingRef, where("0", "==", email));
    const existingPending = await getDocs(pendingQuery);

    if (!existingPending.empty) {
      const pendingData = existingPending.docs[0].data();
      const createdAt = pendingData.createdAt.toDate();

      if (!isWithinMinutes(createdAt, 10)) {
        // Updated delete path
        await deleteDoc(existingPending.docs[0].ref);
        return res.json({
          exists: false,
          message: "Previous verification expired",
        });
      }

      return NextResponse.json({
        exists: true,
        collection: "pending",
        message: "Email verification already in progress",
      });
    }

    res.json({
      exists: false,
      message: "Email available",
    });
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      {
        error: "Failed to check email",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
