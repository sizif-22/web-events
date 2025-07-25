import { sendMessage } from "@/services/messageService.js";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { messageId, eventId, content } = await request.json();
    if (!messageId || !eventId || !content) {
      return NextResponse.json(
        { message: "No data received" },
        { status: 400 }
      );
    }
    await sendMessage(messageId, eventId, content);
    return NextResponse.json({ message: "Message sent successfully ✅" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
