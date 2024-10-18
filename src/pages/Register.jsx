import React, { useState } from "react";
import { Button, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    conjunction: "",
    gramaticallyCorrect: "",
    pluralWorld: "",
    comparativeForm: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      if (value.length > 10) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value.slice(0, 10),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const NewFormData = new FormData();
      for (const key in formData) {
        NewFormData.append(key, formData[key]);
      }
      const response = await axios.post(
        "https://vivo-registration.onrender.com/api/register",
        NewFormData
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
        conjunction: "",
        gramaticallyCorrect: "",
        pluralWorld: "",
        comparativeForm: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    Navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="flex justify-center items-center w-full max-w-[500px] border bg-white rounded-2xl p-4 m-2">
        <form
          className="flex flex-col gap-6 justify-center w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name">Name:</label>
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
          <div>
            <label htmlFor="id">ID:</label>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="conjunction">
              Which of the following is a conjunction?
            </label>
            <select
              id="conjunction"
              name="conjunction"
              value={formData.conjunction}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Answer
              </option>
              <option value="With">With</option>
              <option value="Because">Because</option>
              <option value="Therefore">Therefore</option>
              <option value="None of the above">None of the above</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="gramaticallyCorrect">
              Select a grammatically correct statement.
            </label>
            <select
              id="gramaticallyCorrect"
              name="gramaticallyCorrect"
              value={formData.gramaticallyCorrect}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Answer
              </option>
              <option value="He ate the sweet greedy">
                He ate the sweet greedy
              </option>
              <option value="I could not find it anyway">
                I could not find it anyway
              </option>
              <option value="I do not have none">I do not have none</option>
              <option value="He is much weak">He is much weak</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="pluralWorld">
              Which of the following word is a plural?
            </label>
            <select
              id="pluralWorld"
              name="pluralWorld"
              value={formData.pluralWorld}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Answer
              </option>
              <option value="Index">Index</option>
              <option value="Analysis">Analysis</option>
              <option value="Crisis">Crisis</option>
              <option value="Criteria">Criteria</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="comparativeForm">
              What is the comparative form of happy?
            </label>
            <select
              id="comparativeForm"
              name="comparativeForm"
              value={formData.comparativeForm}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Answer
              </option>
              <option value="Happiest">Happiest</option>
              <option value="Happyer">Happyer</option>
              <option value="Happier">Happier</option>
            </select>
          </div>

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

      <Modal dismissible show={showModal} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">
              Thank you for your registration!
            </h2>
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
