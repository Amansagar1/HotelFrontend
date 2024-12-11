// PlaceholderCard.jsx

import React from "react";

const PlaceholderCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col group relative">
      {/* Placeholder for Image */}
      <div className="w-full h-[200px] bg-gray-300 animate-pulse"></div>

      {/* Placeholder for Room Details */}
      <div className="p-4">
        <div className="text-xl font-semibold bg-gray-300 w-1/2 h-6 animate-pulse"></div>
        <div className="mt-2">
          <div className="bg-gray-300 w-1/4 h-5 animate-pulse"></div>
        </div>
        <div className="mt-4">
          <div className="bg-gray-300 w-full h-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderCard;
