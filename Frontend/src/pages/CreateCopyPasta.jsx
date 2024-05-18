import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCopyPasta = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5050/api/copypasta/create",
        { content }
      );
      const code = response.data.copypasta.code;
      navigator.clipboard.writeText(code);
      toast.success(`You can edit your CopyPasta with the code: ${code}`);
      toast.success("Code copied to clipboard! Redirecting to homepage...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(`Error creating CopyPasta: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your copypasta here"
          className="w-full p-2 border border-gray-300 rounded-md"
          style={{ minHeight: "200px" }} // Add minHeight style
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
      <ToastContainer className="mt-4" />
    </div>
  );
};

export default CreateCopyPasta;
