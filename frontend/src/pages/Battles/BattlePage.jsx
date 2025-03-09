import React, { useState } from "react";
import axios from "axios";

const BattlePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Basic");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
const response = await axios.post("http://localhost:5000/api/battles", {
  title,
  description,
  level,
},{ withCredentials: true } );

      setMessage("Battle Created Successfully!");
      setTitle("");
      setDescription("");
      setLevel("Basic");
    } catch (error) {
      console.error("Error creating battle:", error);
      setMessage("Failed to create battle. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a Battle</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Battle Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Battle
        </button>
      </form>
    </div>
  );
};

export default BattlePage;
