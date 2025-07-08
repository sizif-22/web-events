import { NextResponse } from "next/server";
import { db } from "@/app/firebase/firestore.events";
import { doc,getDoc } from "firebase/firestore";
import { transporter } from "@/config/email.cjs";
export async function POST(request) {
  try {
    const { documentId, eventId } = await request.json();
    if (!documentId || !eventId) {
      return NextResponse.json(
        {
          error: "Document ID and event ID are required",
        },
        { status: 400 }
      );
    }
    const pendingDoc = await getDoc(
      doc(db, "events", eventId, "pendingParticipants", documentId)
    );

    if (!pendingDoc.exists()) {
      return res.status(404).json({ error: "Document not found" });
    }

    const pendingData = pendingDoc.data();
    const email = pendingData["0"];
    const verificationCode = pendingData.verificationCode;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "hello@web-events-two.vercel.app",
      to: email,
      subject: "Event Registration Verification Code",
      text: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
      html: `
       <div style="font-family: Arial, sans-serif; padding: 20px;">
         <h2>Email Verification</h2>
         <p>Your verification code is:</p>
         <h1 style="font-size: 32px; letter-spacing: 5px; color: #4F46E5; background: #F3F4F6; padding: 20px; text-align: center; border-radius: 8px;">
           ${verificationCode}
         </h1>
         <p>This code will expire in 10 minutes.</p>
         <p>If you didn't request this code, please ignore this email.</p>
       </div>
     `,
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent",
      email,
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    return NextResponse.json(
      {
        error: "Failed to send verification code",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
