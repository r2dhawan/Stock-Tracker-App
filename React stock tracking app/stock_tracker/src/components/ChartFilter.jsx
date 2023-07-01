import React from "react";

const ChartFilter = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 m-1 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer 
      ${
        active
          ? "bg-yellow-500 border-yellow-900 text-neutral-100"
          : "border-yellow-500 text-yellow-500"
      } transition duration-300 hover:ring-2 ring-yellow-400`}
    >
      {text}
    </button>
  );
};

export default ChartFilter;
