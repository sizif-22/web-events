import { NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase.user";
export async function DELETE(request) {
  const { eventId, docId } = req.body;
  const docRef = doc(db, "events", eventId, "participants", docId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("participant did not get deleted yet");
    return NextResponse.json(
      {
        success: true,
        message: "participant did not get deleted yet",
      },
      { status: 500 }
    );
  }
  return NextResponse.json(
    {
      success: true,
      message: "participant deleted successfully",
    },
    { status: 200 }
  );
}
