import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  query,
  where,
  Timestamp,
  getFirestore,
} from "firebase/firestore";
import moment from "moment-timezone";
// import { db } from "../app/firebase/firestore.events.js";
import { app } from "../app/firebase/firebase.config.js";
import { transporter } from "../config/email.js";
import { parseDate, getCairoNow, TIMEZONE } from "../utils/dateUtils.js";
const db = getFirestore(app);
// Constants
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MINUTES = 5;
const MAX_EMAIL_LENGTH = 10000;

// Helper function to convert date to cron expression
function convertToCronExpression(date) {
  const parsedDate = moment.tz(date, TIMEZONE);
  return `${parsedDate.minute()} ${parsedDate.hour()} ${parsedDate.date()} ${
    parsedDate.month() + 1
  } *`;
}

// Helper to validate email content
function validateEmailContent(content) {
  if (!content || typeof content !== "string") {
    throw new Error("Invalid email content");
  }
  if (content.length > MAX_EMAIL_LENGTH) {
    throw new Error(
      `Email content exceeds maximum length of ${MAX_EMAIL_LENGTH} characters`
    );
  }
  return content.trim();
}

async function sendMessage(messageId, eventId, content, retryCount = 0) {
  try {
    // Validate content before proceeding
    const validatedContent = validateEmailContent(content);

    // Get event details
    const eventDoc = await getDoc(doc(db, "events", eventId));
    if (!eventDoc.exists()) {
      throw new Error(`Event ${eventId} not found`);
    }

    // Get participants
    const joinedCollectionRef = collection(
      doc(db, "events", eventId),
      "participants"
    );
    const joinedSnapshot = await getDocs(joinedCollectionRef);

    const emails = [];
    joinedSnapshot.forEach((joinedDoc) => {
      const participantData = joinedDoc.data();
      if (
        participantData["0"] &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantData["0"])
      ) {
        emails.push(participantData["0"]);
      }
    });

    if (emails.length === 0) {
      throw new Error(`No valid participants found for event ${eventId}`);
    }

    // Send emails
    const emailPromises = emails.map((email) =>
      transporter.sendMail({
        from: process.env.EMAIL_FROM || "hello@web-events-two.vercel.app",
        to: email,
        subject: "Event Notification",
        text: validatedContent,
        html: `<div style="font-family: Arial, sans-serif;">
                <p>${validatedContent}</p>
               </div>`,
      })
    );

    await Promise.all(emailPromises);

    // Update message status
    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, {
      sent: true,
      sentAt: Timestamp.now(),
      recipientCount: emails.length,
      recipients: emails,
      retryCount,
      status: "completed",
    });

    return true;
  } catch (error) {
    console.error(`Error sending message ${messageId}:`, error);

    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, {
      error: error.message,
      lastAttempt: Timestamp.now(),
      retryCount,
      status: retryCount >= MAX_RETRY_ATTEMPTS ? "failed" : "pending",
    });

    // Implement retry logic
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      console.log(
        `Scheduling retry ${retryCount + 1} for message ${messageId}`
      );
      setTimeout(() => {
        sendMessage(messageId, eventId, content, retryCount + 1).catch(
          (retryError) =>
            console.error(
              `Retry ${retryCount + 1} failed for message ${messageId}:`,
              retryError
            )
        );
      }, RETRY_DELAY_MINUTES * 60 * 1000);
    }

    throw error;
  }
}

async function scheduleMessage(messageId, eventId, content, date) {
  try {
    const parsedDate = parseDate(date);
    if (!parsedDate.isValid()) {
      throw new Error("Invalid date for scheduling");
    }

    const cronExpression = convertToCronExpression(parsedDate);
    console.log(
      `Scheduling message ${messageId} for ${parsedDate.format()} (${cronExpression})`
    );

    const res = await fetch(
      "https://nlfevk1ig6.execute-api.eu-north-1.amazonaws.com/prod/schedule",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, eventId, content, date }),
      }
    );
    if (!res.ok) {
      console.log("message didn't get scheduled");
    }
  } catch (error) {
    console.error(`Error scheduling message ${messageId}:`, error);
    throw error;
  }
}

async function handleMissedMessages(messages) {
  const results = [];
  for (const doc of messages) {
    const messageData = doc.data();
    try {
      await sendMessage(doc.id, messageData.eventId, messageData.content);
      results.push({ id: doc.id, status: "success" });
      console.log(`Processed missed message ${doc.id}`);
    } catch (error) {
      results.push({ id: doc.id, status: "error", error: error.message });
      console.error(`Failed to process missed message ${doc.id}:`, error);
    }
  }
  return results;
}

async function loadUnsentMessages() {
  try {
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("sent", "==", false),
      where("status", "in", ["pending", null])
    );
    const querySnapshot = await getDocs(q);

    console.log(`Found ${querySnapshot.size} unsent messages`);

    const now = getCairoNow();
    const futureMessages = [];
    const missedMessages = [];

    querySnapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageDate = moment.tz(
        messageData.date instanceof Timestamp
          ? messageData.date.toDate()
          : messageData.date,
        TIMEZONE
      );

      if (messageDate.isValid()) {
        if (messageDate.isAfter(now)) {
          futureMessages.push(doc);
        } else {
          missedMessages.push(doc);
        }
      } else {
        console.error(`Invalid date for message ${doc.id}`);
      }
    });

    if (missedMessages.length > 0) {
      console.log(`Processing ${missedMessages.length} missed messages...`);
      await handleMissedMessages(missedMessages);
    }

    console.log(`Scheduling ${futureMessages.length} future messages...`);
    futureMessages.forEach((doc) => {
      const messageData = doc.data();
      const messageDate = moment.tz(
        messageData.date instanceof Timestamp
          ? messageData.date.toDate()
          : messageData.date,
        TIMEZONE
      );

      scheduleMessage(
        doc.id,
        messageData.eventId,
        messageData.content,
        messageDate.format()
      );
    });

    return {
      total: querySnapshot.size,
      scheduled: futureMessages.length,
      processed: missedMessages.length,
    };
  } catch (error) {
    console.error("Error loading unsent messages:", error);
    throw error;
  }
}

async function storeMessage(message, eventId, date) {
  try {
    const parsedDate = parseDate(date);
    if (!parsedDate.isValid()) {
      throw new Error("Invalid date for storage");
    }

    // Validate message content
    const validatedContent = validateEmailContent(message);

    const messageData = {
      content: validatedContent,
      eventId,
      date: Timestamp.fromDate(parsedDate.toDate()),
      sent: false,
      createdAt: Timestamp.now(),
      originalDateString: date,
      normalizedDate: parsedDate.format(),
      timezone: TIMEZONE,
      status: "pending",
      retryCount: 0,
    };

    const messagesRef = collection(db, "messages");
    const docRef = await addDoc(messagesRef, messageData);
    console.log("Message stored with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error storing message:", error);
    throw error;
  }
}

export {
  sendMessage,
  scheduleMessage,
  handleMissedMessages,
  loadUnsentMessages,
  storeMessage,
};
