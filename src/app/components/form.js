"use client";
import { useState } from "react";
import { X } from "lucide-react";

const Form = ({ form, onSubmit, onClose }) => {
  const [answers, setAnswers] = useState({});

  const handleInputChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Now</h2>
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
          <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
