import React, { useState } from "react";
import { Button, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://examregistrayion-backend.onrender.com/api/register",
        formData
      );
      if (response.status === 201) {
        setShowModal(true);
        setIsLoading(false);
      } else {
        alert("Error submitting form. Please try again.");
        setIsLoading(false);
      }
      setFormData({
        name: "",
        id: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
        question9: "",
        question10: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-pink-50 p-6">
      {/* Top banner */}
      <div className="flex justify-center items-center bg-white w-full max-w-[700px] px-6 py-10 mb-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-pink-700 text-center">INK YOUR DREAMS & BE SPELLBOUND.</h1>
      </div>

      {/* Mumbai Regional Finale Section */}
      <div className="bg-white w-full max-w-[700px] p-6 mb-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-pink-600">Mumbai Regional Finale - Qualifier Round</h2>
        <p className="text-sm text-gray-600 mt-2">
          SBI Life Spell Bee 2024, in association with Mirchi – India’s biggest school spelling competition.
        </p>
      </div>

      {/* Form */}
      <div className="flex justify-center items-center w-full max-w-[700px]">
        <form
          className="flex flex-col gap-6 justify-center w-full"
          onSubmit={handleSubmit}
        >
          {/* Name Field */}
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-4">Name:</label>
            <TextInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* ID Field */}
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <label htmlFor="id" className="block text-gray-700 font-medium mb-4">Student Unique Code:</label>
            <TextInput
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter your ID"
              required
            />
          </div>

          {/* Questions */}
          {[
            {
              label: "1. Spell the word: An unexpected or astonishing event",
              options: ["A. Suprize", "B. Serprize", "C. Surprise", "D. Sarprise"],
              name: "question1",
            },
            {
              label: "2. Spell the word: An animal that lives in the ocean and has eight arms",
              options: ["A. Octopus", "B. Octopuss", "C. Octopos", "D. Octopos"],
              name: "question2",
            },
            {
              label: "3. Which word is spelled correctly?",
              options: ["A. Dissapoint", "B. Disapoint", "C. Dissappoint", "D. Disappoint"],
              name: "question3",
            },
            {
              label: "4. Which of the following is the correct spelling?",
              options: ["A. Misspell", "B. Mispel", "C. Misspel", "D. Misspelle"],
              name: "question4",
            },
            {
              label: '5. Choose the correct spelling for the opposite of "hot."',
              options: ["A. Coll", "B. Cold", "C. Kolde", "D. Colde"],
              name: "question5",
            },
            {
              label: "6. Which option is the correct spelling of a vehicle with two wheels?",
              options: ["A. Bysycle", "B. Bycicle", "C. Bicycle", "D. Bicyle"],
              name: "question6",
            },
            {
              label: '7. Which word is spelled correctly for "something you play music on"?',
              options: ["A. Instroment", "B. Instrument", "C. Instrumant", "D. Instromentt"],
              name: "question7",
            },
            {
              label: "8. Add the missing letter in the word ACOMPLISHMENT",
              options: ["A. C", "B. K", "C. H", "D. I"],
              name: "question8",
            },
            {
              label: "9. Remove the extra letter in the word APPETITTE",
              options: ["A. P", "B. E", "C. I", "D. T"],
              name: "question9",
            },
            {
              label:
                "10. Find the misspelt word in the sentence: The prisoner was subjected to systemetic torture",
              options: ["A. Torture", "B. Systemetic", "C. Prisoner", "D. Subjected"],
              name: "question10",
            },
          ].map((question, index) => (
            <div key={index} className="p-6 bg-white rounded-lg border shadow-sm">
              <label className="block text-gray-700 font-medium">{question.label}</label>
              <div className="flex flex-col gap-2 mt-2">
                {question.options.map((option, idx) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={question.name}
                      value={option.charAt(0)}
                      checked={formData[question.name] === option.charAt(0)}
                      onChange={handleChange}
                    />{" "}
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          {isLoading ? (
            <Button className="bg-blue-600 hover:bg-blue-800" disabled>
              {<Spinner />}
            </Button>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-800" type="submit">
              SUBMIT
            </Button>
          )}
        </form>
      </div>

      {/* Modal */}
      <Modal dismissible show={showModal} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Thank you for your registration!</h2>
            <Button
              onClick={handleModalClose}
              className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
