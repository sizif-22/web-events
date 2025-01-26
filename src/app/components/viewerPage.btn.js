"use client";
import { useState } from "react";
import Form from "@/app/components/form";
import { ArrowRight } from "lucide-react";
import { addJoinedEvent } from "../firebase/firestore.events";
const BTN = ({ form, backgroundColor, color, eventId }) => {
  const [showForm, setShowForm] = useState(false);
  console.log(eventId);
  const handleFormSubmit = async (answers) => {
    console.log("Form Answers:", answers);
    // await addJoinedEvent(eventId, answers); // dh zena
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      {!showForm ? (
        <button
          style={{
            backgroundColor,
            color,
          }}
          onClick={() => setShowForm(true)}
          className="font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center space-x-2 w-fit mx-auto hover:shadow-lg"
        >
          <span>Join Now</span>
          <ArrowRight size={20} />
        </button>
      ) : (
        <Form
          form={form}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
          eventId={eventId}
        />
      )}
    </div>
  );
};
export default BTN;
