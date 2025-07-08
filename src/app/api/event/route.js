import { NextResponse } from "next/server";
import { getCairoNow, parseDate } from "@/utils/dateUtils.js";
import {
  sendMessage,
  storeMessage,
  scheduleMessage,
} from "@/services/messageService.js";
import { updateEvent } from "@/services/eventService.js";
// Define constants
const TIMEZONE = process.env.TIMEZONE || "Africa/Cairo";
const MAX_MESSAGE_LENGTH = 1000; // Example limit

export async function POST(request) {
  const { date, id: eventId, message } = await request.json();
  if (!date || !eventId || !message) {
    return NextResponse.json(
      {
        error: "Missing required fields",
        required: ["date", "id", "message"],
        received: { date, eventId, message },
      },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      {
        error: "Message too long",
        maxLength: MAX_MESSAGE_LENGTH,
        receivedLength: message.length,
      },
      { status: 400 }
    );
  }
  try {
    console.log("Validating date:", date);
    const parsedDate = parseDate(date);
    const currentDate = getCairoNow();

    if (!parsedDate.isValid()) {
      return NextResponse.json(
        {
          error: "Invalid date format",
          received: date,
          parsedAs: parsedDate.format(),
          currentTime: currentDate.format(),
          timezone: TIMEZONE,
        },
        { status: 400 }
      );
    }

    const normalizedDate = parsedDate.format();

    try {
      // Use a transaction or atomic operation if your database supports it
      const messageId = await storeMessage(message, eventId, normalizedDate);
      await updateEvent(eventId, messageId);

      // Check if the date is in the past
      if (parsedDate.isBefore(currentDate)) {
        console.log("Date is in the past, sending immediately...");
        try {
          await sendMessage(messageId, eventId, message);
          return NextResponse.json({
            success: true,
            message: "Message sent immediately",
            messageId,
            originalDate: date,
            normalizedDate,
            timezone: TIMEZONE,
            sentImmediately: true,
          });
        } catch (sendError) {
          // Log the error but don't expose internal error details to client
          console.error("Failed to send message:", sendError);
          return NextResponse.json(
            {
              error: "Failed to send message immediately",
              messageId,
            },
            { status: 500 }
          );
        }
      }

      // If date is in the future, schedule it
      try {
        scheduleMessage(messageId, eventId, message, normalizedDate);
        return NextResponse.json({
          success: true,
          message: "Event scheduled successfully",
          scheduledFor: parsedDate.format(),
          messageId,
          originalDate: date,
          normalizedDate,
          timezone: TIMEZONE,
          sentImmediately: false,
        });
      } catch (scheduleError) {
        console.error("Failed to schedule message:", scheduleError);
        return NextResponse.json(
          {
            error: "Failed to schedule message",
            messageId,
          },
          { status: 500 }
        );
      }
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      return NextResponse.json(
        {
          error: "Failed to process event",
          details: "Database operation failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error handling event:", error);
    return NextResponse.json(
      {
        error: "Failed to process event",
        details: "Internal server error",
      },
      { status: 500 }
    );
  }
}
