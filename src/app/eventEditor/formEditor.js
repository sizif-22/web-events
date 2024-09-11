import { useState } from "react";

const FormEditor = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", isOptional: false, options: [] }
    ]);
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

  const saveForm = () => {
    // Here you can dispatch the form data or handle it as per your needs
    console.log("Form Saved", questions);
  };

  return (
    <div>
      <button onClick={addQuestion} className="bg-blue-500 text-white p-2 rounded-md mb-4">
        Add Question
      </button>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4">
          <input
            type="text"
            placeholder="Enter your question"
            value={question.text}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <div>
            <label className="mr-4">
              <input
                type="radio"
                checked={question.isOptional}
                onChange={() => toggleOptional(qIndex)}
              />{" "}
              Optional
            </label>
            <label>
              <input
                type="radio"
                onChange={() => addOption(qIndex)}
              />{" "}
              Add Options
            </label>
          </div>
          {question.options.length > 0 && (
            <div className="mt-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Enter option"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
              ))}
              <button
                onClick={() => addOption(qIndex)}
                className="bg-green-500 text-white p-2 rounded-md mt-2"
              >
                Add Option
              </button>
            </div>
          )}
        </div>
      ))}
      <button onClick={saveForm} className="bg-red-500 text-white p-2 rounded-md">
        Save Form
      </button>
    </div>
  );
};

export default FormEditor;
