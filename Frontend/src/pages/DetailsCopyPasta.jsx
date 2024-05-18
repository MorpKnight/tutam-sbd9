import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  getCopyPastaDetails,
  verifyEditPerms,
} from "../actions/CopyPasta.actions";

const ViewCopyPasta = () => {
  const { id } = useParams();
  const [copypasta, setCopypasta] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

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

  const handleVerify = async () => {
    try {
      const response = await verifyEditPerms(id, code);
      console.log(response.message);
      if (response.message === "Copypasta found") {
        navigate(`/edit/${id}`, { state: { code } });
      } else {
        toast.error("Invalid code!");
      }
    } catch (error) {
      toast.error(`Error verifying code: ${error.message}`);
    }
  };

  const handleCopy = () => {
    toast.success("Copied to clipboard!");
    navigator.clipboard.writeText(copypasta);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <p className="text-xl my-4">{copypasta}</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="flex flex-row pt-4">
        <button
          onClick={handleVerify}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Verify Code
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Copy Text
        </button>
        <button
          onClick={() => navigate("/")}
          className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Home Page
        </button>
      </div>
      <ToastContainer className="mt-4" />
    </div>
  );
};

export default ViewCopyPasta;
