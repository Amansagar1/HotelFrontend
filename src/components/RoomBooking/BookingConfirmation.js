import React from "react";

const BookingConfirmation = () => {
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl text-green-500 font-semibold">Thank you for choosing us!</h2>
      <p className="mt-4 text-gray-700">Your booking was successful. We look forward to your stay!</p>
      <p className="text-sm mt-4 text-gray-700">Please refresh the page</p>
      <button  onClick={() => window.location.reload()} className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
        Close
      </button>
    </div>
  );
};

export default BookingConfirmation;
