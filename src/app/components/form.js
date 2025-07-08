"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firestore.events"; // Make sure this path is correct

const VerificationForm = ({ onSubmit, onClose }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verifing, setVerifing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }
    onSubmit(code);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Verify Email</h2>
        <p className="text-gray-600 mb-4">
          Please enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="numbers"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="w-full px-4 py-2 border rounded-md text-lg tracking-wider text-center text-black"
            placeholder="000000"
            maxLength={6}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            onClick={(e) => setVerifing(true)}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              verifing
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            {verifing ? "Verifing..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Form = ({ form, onSubmit, onClose, eventId }) => {
  console.log("eventId:", eventId);
  const [answers, setAnswers] = useState({});
  const [showVerification, setShowVerification] = useState(false);
  const [pendingDocId, setPendingDocId] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate eventId when component mounts
  useEffect(() => {
    if (!eventId) {
      console.error("EventId is required but was not provided");
      setError("Configuration error: Event ID is missing");
    }
  }, [eventId]);

  const handleInputChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validate eventId
      if (!eventId) {
        throw new Error("Event ID is required");
      }

      // Validate required fields
      const requiredFields = form
        .filter((field) => !field.isOptional)
        .map((_, index) => index);

      for (const index of requiredFields) {
        if (!answers[index]) {
          throw new Error("Please fill in all required fields");
        }
      }

      // Get reference to the event document
      const eventDocRef = doc(db, "events", eventId.toString());

      // Check if email exists in participants
      const participantsRef = collection(eventDocRef, "participants");
      const participantsQuery = query(
        participantsRef,
        where("0", "==", answers[0])
      );
      const existingParticipant = await getDocs(participantsQuery);

      if (!existingParticipant.empty) {
        throw new Error("This email is already registered");
      }

      // Check pending participants
      const pendingRef = collection(eventDocRef, "pendingParticipants");
      const pendingQuery = query(pendingRef, where("0", "==", answers[0]));
      const existingPending = await getDocs(pendingQuery);

      // If exists in pending, delete old document
      if (!existingPending.empty) {
        await deleteDoc(existingPending.docs[0].ref);
      }

      // Create new pending document
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const pendingDocRef = doc(pendingRef);

      const pendingData = {
        ...answers,
        verificationCode,
        createdAt: Timestamp.now(),
        eventId: eventId.toString(),
      };

      await setDoc(pendingDocRef, pendingData);

      // Send verification code  
      const response = await fetch(
        `/api/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentId: pendingDocRef.id,
            eventId: eventId.toString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      setPendingDocId(pendingDocRef.id);
      setShowVerification(true);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (code) => {
    setIsSubmitting(true);
    try {
      if (!eventId || !pendingDocId) {
        throw new Error("Missing required verification data");
      }

      const response = await fetch(
        `/api/confirm-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentId: pendingDocId,
            code,
            eventId: eventId.toString(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      onSubmit(answers);
    } catch (error) {
      setError(error.message || "Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showVerification) {
    return <VerificationForm onSubmit={handleVerification} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Now</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {form.map((field, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.text}
                {!field.isOptional && <span className="text-red-500"> *</span>}
              </label>
              {field.options && field.options.length > 0 ? (
                <select
                  required={!field.isOptional}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="mt-1 text-black block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="" className="text-black">
                    Select an option
                  </option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : index !== 0 ? (
                <input
                  type="text"
                  placeholder={`${field.text}`}
                  required={!field.isOptional}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              ) : (
                <input
                  type="email"
                  placeholder={`${field.text}`}
                  required={!field.isOptional}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
