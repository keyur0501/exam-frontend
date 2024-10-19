import React, { useState } from "react";
import { Button, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import statement from "../assets/statement.png";

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
    question11: "",
    question12: "",
    question13: "",
    question14: "",
    question15: "",
    question16: "",
    question17: "",
    question18: "",
    question19: "",
    question20: "",
    question21: "",
    question22: "",
    question23: "",
    question24: "",
    question25: "",
    question26: "",
    question27: "",
    question28: "",
    question29: "",
    question30: "",
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

    // Validate that all questions have been answered
    const allQuestionsAnswered = Object.keys(formData).every((key) => {
      if (key.startsWith("question")) {
        return formData[key] !== ""; // Ensure no question is empty
      }
      return true;
    });

    if (!allQuestionsAnswered) {
      alert("Please answer all the questions before submitting.");
      setIsLoading(false);
      return;
    }

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
        question11: "",
        question12: "",
        question13: "",
        question14: "",
        question15: "",
        question16: "",
        question17: "",
        question18: "",
        question19: "",
        question20: "",
        question21: "",
        question22: "",
        question23: "",
        question24: "",
        question25: "",
        question26: "",
        question27: "",
        question28: "",
        question29: "",
        question30: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show specific error message from the backend if available
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred.";
      alert(errorMessage); // Display the error message
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/logo");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-pink-50 p-6">
      {/* Top banner */}
      <div className="flex justify-center items-center bg-white w-full max-w-[700px]  mb-6 shadow-md rounded-lg">
        <img className=" w-[500px] h-[70px]" src={statement} alt="" />
      </div>

      {/* Mumbai Regional Finale Section */}
      <div className="bg-white w-full max-w-[700px] p-6 mb-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-pink-600">
          Mumbai Regional Finale - Qualifier Round
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          SBI Life Spell Bee 2024, in association with Mirchi – India’s biggest
          school spelling competition.
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
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-4"
            >
              Name: <span className="text-red-500">*</span>
            </label>
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
            <label
              htmlFor="id"
              className="block text-gray-700 font-medium mb-4"
            >
              Student Unique Code: <span className="text-red-500">*</span>
            </label>
            <TextInput
              type="text"
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
              label: "MCQ01",
              options: [
                "A. HAWAIAN",
                "B. HAWAAIAN",
                "C. HAWAIIAN",
                "D. HAWAIIEAN",
                "E. NONE OF THE ABOVE",
              ],
              name: "question1",
            },
            {
              label: "MCQ02",
              options: [
                "A. ADOLESCENT",
                "B. ADOLESSENT",
                "C. ADOLECENT",
                "D. ADOLESENT",
                "E. NONE OF THE ABOVE",
              ],
              name: "question2",
            },
            {
              label: "MCQ03",
              options: [
                "A. AQUIT",
                "B. ACQUIT",
                "C. ACKWIT",
                "D. AQUITTE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question3",
            },
            {
              label: "MCQ04",
              options: [
                "A. GLYPH",
                "B. GLIPH",
                "C. GLIFF",
                "D. GLIF",
                "E. NONE OF THE ABOVE",
              ],
              name: "question4",
            },
            {
              label: "MCQ05",
              options: [
                "A. BRIECH",
                "B. BRIETCH",
                "C. BREICH",
                "D. BREACH",
                "E. NONE OF THE ABOVE",
              ],
              name: "question5",
            },
            {
              label: "MCQ06",
              options: [
                "A. ENSEFELIC",
                "B. ENCEFLIQUE",
                "C. ENCEPHALIK",
                "D. ENSCEPHELLIC",
                "E. NONE OF THE ABOVE",
              ],
              name: "question6",
            },
            {
              label: "MCQ07",
              options: [
                "A. REZUME",
                "B. RESEUM",
                "C. RISUME",
                "D. RESUME",
                "E. NONE OF THE ABOVE",
              ],
              name: "question7",
            },
            {
              label: "MCQ08",
              options: [
                "A. BEREPHT",
                "B. BEREFT",
                "C. BIREFT",
                "D. BERREFT",
                "E. NONE OF THE ABOVE",
              ],
              name: "question8",
            },
            {
              label: "MCQ09",
              options: [
                "A. UBERMENSH",
                "B. UBERMENTCH",
                "C. UBERMENSCH",
                "D. EUBERMENSH",
                "E. NONE OF THE ABOVE",
              ],
              name: "question9",
            },
            {
              label: "MCQ10",
              options: [
                "A. CONTEMTUOS",
                "B. CONTEMPTIOUS",
                "C. CONTEMTUOUS",
                "D. CONTEMPTUOUS",
                "E. NONE OF THE ABOVE",
              ],
              name: "question10",
            },
            {
              label: "MCQ11",
              options: [
                "A. BYNOCULARS",
                "B. BINOCCULARS",
                "C. BINOCUELERS",
                "D. BINOCULARS",
                "E. NONE OF THE ABOVE",
              ],
              name: "question11",
            },
            {
              label: "MCQ12",
              options: [
                "A. DIPLEAT",
                "B. DEPLETE",
                "C. DEPLEET",
                "D. DIPLIET",
                "E. NONE OF THE ABOVE",
              ],
              name: "question12",
            },
            {
              label: "MCQ13",
              options: [
                "A. ADDMIRAL",
                "B. ADMIRRAL",
                "C. ADMIRAL",
                "D. ADMIRRLE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question13",
            },
            {
              label: "MCQ14",
              options: [
                "A. FORAGE",
                "B. FORRAGE",
                "C. FOURAGE",
                "D. FORRIDGE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question14",
            },
            {
              label: "MCQ15",
              options: [
                "A. KNAQUERED",
                "B. KNACKERED",
                "C. KNAKERED",
                "D. NACKERED",
                "E. NONE OF THE ABOVE",
              ],
              name: "question15",
            },
            {
              label: "MCQ16",
              options: [
                "A. YOKKEL",
                "B. YOQUEL",
                "C. YOKEL",
                "D. YOCKLE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question16",
            },
            {
              label: "MCQ17",
              options: [
                "A. OAFISCH",
                "B. OAPHISH",
                "C. OFEISH",
                "D. OAFISH",
                "E. NONE OF THE ABOVE",
              ],
              name: "question17",
            },
            {
              label: "MCQ18",
              options: [
                "A. REVUE",
                "B. REVEU",
                "C. REVEW",
                "D. REVIUE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question18",
            },
            {
              label: "MCQ19",
              options: [
                "A. NIANDERTHAL",
                "B. NEANDERTHAL",
                "C. NEANDRETHOL",
                "D. NIYANDERTHOLL",
                "E. NONE OF THE ABOVE",
              ],
              name: "question19",
            },
            {
              label: "MCQ20",
              options: [
                "A. GOYTER",
                "B. GOITTER",
                "C. GOITRE",
                "D. GOUYTER",
                "E. NONE OF THE ABOVE",
              ],
              name: "question20",
            },
            {
              label: "MCQ21",
              options: [
                "A. JUBILLY",
                "B. JUBILIE",
                "C. JUBBILY",
                "D. JUBBILLEE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question21",
            },
            {
              label: "MCQ22",
              options: [
                "A. QUIESCENT",
                "B. QUIESENT",
                "C. QUIECCENT",
                "D. QUEISENT",
                "E. NONE OF THE ABOVE",
              ],
              name: "question22",
            },
            {
              label: "MCQ23",
              options: [
                "A. DERVICH",
                "B. DURVISH",
                "C. DERVISH",
                "D. DUVVISH",
                "E. NONE OF THE ABOVE",
              ],
              name: "question23",
            },
            {
              label: "MCQ24",
              options: [
                "A. MEDALLION",
                "B. MEDDALION",
                "C. MEDALLEON",
                "D. MEDELION",
                "E. NONE OF THE ABOVE",
              ],
              name: "question24",
            },
            {
              label: "MCQ25",
              options: [
                "A. TAIWAN",
                "B. TAIWWAN",
                "C. TAIWAIN",
                "D. TAIWANEE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question25",
            },
            {
              label: "MCQ26",
              options: [
                "A. LITIGATION",
                "B. LITAGATION",
                "C. LITAGITION",
                "D. LITIGANT",
                "E. NONE OF THE ABOVE",
              ],
              name: "question26",
            },
            {
              label: "MCQ27",
              options: [
                "A. CHAMPION",
                "B. CHAMPYON",
                "C. CHAMPYIN",
                "D. CHAMPIONEE",
                "E. NONE OF THE ABOVE",
              ],
              name: "question27",
            },
            {
              label: "MCQ28",
              options: [
                "A. MOZOOS",
                "B. MOZOS",
                "C. MOOZOS",
                "D. MOOZOOS",
                "E. NONE OF THE ABOVE",
              ],
              name: "question28",
            },
            {
              label: "MCQ29",
              options: [
                "A. CRUSTACEA",
                "B. CRUSTACEON",
                "C. CRUSTACEUS",
                "D. CRUSTACIAN",
                "E. NONE OF THE ABOVE",
              ],
              name: "question29",
            },
            {
              label: "MCQ30",
              options: [
                "A. EPITOME",
                "B. EPITHOME",
                "C. EPITOMY",
                "D. EPITHOMEY",
                "E. NONE OF THE ABOVE",
              ],
              name: "question30",
            },
          ].map((question, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border shadow-sm"
            >
              <label className="block text-gray-700 font-medium">
                {question.label}
                <span className="text-red-500"> *</span>
              </label>
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
            <h2 className="text-2xl font-semibold mb-4">
              THANK YOU FOR YOUR PARTICIPATION!
            </h2>
            <div className="flex justify-end">
              <Button
                onClick={handleModalClose}
                className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                CLOSE
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
