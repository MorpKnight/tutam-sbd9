import React from "react";
import { Link } from "react-router-dom";

const CardComponent = ({ content, id }) => {
  return (
    <Link to={`/${id}`} className="no-underline text-black">
      <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full m-3 max-h-[100px] relative">
        <div className="md:flex">
          <div className="md:flex-shrink-0"></div>
          <div className="p-8">
            <p className="mt-2 text-gray-500 line-clamp-5 overflow-hidden">
              {content}
            </p>
            <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
