import { NextResponse } from "next/server";
import {
  doc,
  getDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase.user";
import sendQR from "@/utils/qrUtils.js";
import { isWithinMinutes } from "@/utils/dateUtils.js";

export async function POST(request) {
  try {
    const { documentId, code, eventId } = await request.json();
    if (!documentId || !code || !eventId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Get pending document
    const pendingDocRef = doc(
      db,
      "events",
      eventId,
      "pendingParticipants",
      documentId
    );

    const pendingDoc = await getDoc(pendingDocRef);

    if (!pendingDoc.exists()) {
      return NextResponse.json(
        { error: "Verification expired or not found" },
        { status: 404 }
      );
    }

    const pendingData = pendingDoc.data();
    const email = pendingData["0"];

    // Validate verification code
    if (pendingData.verificationCode !== code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Check if code is expired
    const createdat = pendingData.createdAt.toDate();
    if (!isWithinMinutes(createdat, 10)) {
      await deleteDoc(pendingDocRef);
      return NextResponse.json(
        { error: "Verification code expired" },
        { status: 400 }
      );
    }

    // Move to participants collection
    const { verificationCode, createdAt, ...participantData } = pendingData;
    const participantsRef = collection(
      doc(db, "events", eventId),
      "participants"
    );
    const newParticipantRef = doc(participantsRef);

    const docId = newParticipantRef.id;
    try {
      // Send QR with eventId and documentId concatenated
      await sendQR(email, eventId, docId);

      // Write participant data to Firestore
      const joinedAt = serverTimestamp();
      try {
        let { nofparticipants } = (
          await getDoc(doc(db, "events", eventId))
        ).data();
        console.warn("nofparticipants: ", nofparticipants);
        nofparticipants += 1;
        console.warn("nofparticipants: ", nofparticipants);
        await updateDoc(doc(db, "events", eventId), { nofparticipants });
      } catch (error) {
        console.error("Error updating nofparticipants:", error);
      }
      await setDoc(newParticipantRef, {
        joinedAt,
        attended: false,
        ...participantData,
      });
    } catch (error) {
      console.error(
        "Failed to send welcome message or save participant:",
        error
      );
    }

    // Delete pending document
    await deleteDoc(pendingDocRef);
    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error confirming verification:", error);
    return NextResponse.json(
      {
        error: "Failed to confirm verification",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
