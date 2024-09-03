"use client";
import axios from "axios";

export default function EventCreation() {
  const createGoogleForm = async (formData) => {
    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbyWzMS-s9Wioyeusj6MQNPAeE4zlXNEJ9ymWyu--s4NfvMm_oqKND4CrMbrzYecF6tX_g/exec",
        formData
      );
      console.log("Form created:", response.data);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const formCreationFunc = () => {
    // Example usage
    const formData = {
      title: "My New Form",
      questions: [
        { question: "What is your name?", type: "TEXT" },
        { question: "What is your age?", type: "NUMBER" },
      ],
    };
    createGoogleForm(formData);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <button onClick={formCreationFunc}>Create form</button>
    </div>
  );
}
