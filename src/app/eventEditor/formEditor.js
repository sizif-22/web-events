"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleForm } from "@/lib/editor.data";

const FormEditor = () => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([
    { text: "Your Email ?", isOptional: false, options: [] },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", isOptional: false, options: [] }]);
  };

  const handleQuestionChange = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const toggleOptional = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].isOptional = !newQuestions[index].isOptional;
    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = text;
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const saveForm = () => {
    dispatch(handleForm(questions));
    console.log("Form Saved", questions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Form Editor</h1>
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Add Question
        </button>
      </div>

      {questions.map((question, qIndex) => (
        <div
          key={qIndex}
          className="bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Question {qIndex + 1}</h2>
            <button
              onClick={() => removeQuestion(qIndex)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your question"
            value={question.text}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`optional-${qIndex}`}
              checked={question.isOptional}
              onChange={() => toggleOptional(qIndex)}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <label
              htmlFor={`optional-${qIndex}`}
              className="text-sm font-medium"
            >
              Optional
            </label>
          </div>
          <div className="space-y-2">
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter option"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeOption(qIndex, oIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addOption(qIndex)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              Add Option
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={saveForm}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Form
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Form Preview</h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-medium">
              {question.text}
              {question.isOptional && (
                <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded">
                  Optional
                </span>
              )}
            </p>
            {question.options.length > 0 ? (
              question.options.map((option, oIndex) => (
                <div key={oIndex} className="ml-4 mt-2">
                  <input
                    type="radio"
                    id={`q${index}-o${oIndex}`}
                    name={`q${index}`}
                    className="mr-2"
                  />
                  <label htmlFor={`q${index}-o${oIndex}`}>{option}</label>
                </div>
              ))
            ) : (
              <input
                type="text"
                className="mt-2 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormEditor;
