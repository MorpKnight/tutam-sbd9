import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  updateCopyPasta,
  getCopyPastaDetails,
  deleteCopyPasta,
} from "../actions/CopyPasta.actions";

const EditCopyPasta = () => {
  const { id } = useParams();
  const [copypasta, setCopypasta] = useState("");
  const navigate = useNavigate();
  const code = useLocation().state.code;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCopyPastaDetails(id);
        setCopypasta(data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await updateCopyPasta(id, copypasta, code);
      console.log(response.message);
      if (response.message === "Copypasta updated") {
        toast.success("Copypasta updated!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error("Error updating copypasta!");
      }
    } catch (error) {
      toast.error(`Error updating copypasta: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this copypasta?")) {
      try {
        const response = await deleteCopyPasta(id, code);
        console.log(response.message);
        if (response.message === "Copypasta deleted") {
          toast.success("Copypasta deleted!");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          toast.error("Error deleting copypasta!");
        }
      } catch (error) {
        toast.error(`Error deleting copypasta: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <textarea
        value={copypasta}
        onChange={(e) => setCopypasta(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="flex flex-row pt-4">
        <button
          onClick={handleUpdate}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Update Copypasta
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Home Page
        </button>
        <button
          onClick={handleDelete}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete Copypasta
        </button>
      </div>
      <ToastContainer className="mt-4" />
    </div>
  );
};

export default EditCopyPasta;
