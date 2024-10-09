import nodemailer from "nodemailer";
import admin from "firebase-admin";
import functions from "firebase-functions";

admin.initializeApp();
exports.checkScheduledEmails = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async (context) => {
    const now = new Date();
    const db = admin.firestore();

    // Query all events
    const eventsSnapshot = await db.collection("events").get();

    for (const eventDoc of eventsSnapshot.docs) {
      const scheduledEmailsRef = eventDoc.ref.collection("scheduledEmails");

      // Find emails that need to be sent
      const emailsToSend = await scheduledEmailsRef
        .where("status", "==", "pending")
        .where("scheduledTime", "<=", now.toISOString())
        .get();

      for (const emailDoc of emailsToSend.docs) {
        const emailData = emailDoc.data();

        // Send email
        const transporter = nodemailer.createTransport({
          // Configure your email service here
          service: "gmail",
          auth: {
            user: functions.config().gmail.email,
            pass: functions.config().gmail.password,
          },
        });

        try {
          await transporter.sendMail({
            from: functions.config().gmail.email,
            to: emailData.recipients.join(","),
            subject: "Scheduled Event Email",
            text: emailData.content,
          });

          // Update status to sent
          await emailDoc.ref.update({
            status: "sent",
            sentAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        } catch (error) {
          console.error("Error sending email:", error);
          await emailDoc.ref.update({
            status: "error",
            error: error.message,
          });
        }
      }
    }

    return null;
  });
