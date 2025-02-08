import React from "react";

const BookingConfirmation = () => {
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl text-green-500 font-semibold">Thank you for your booking request!</h2>
      <p className="mt-4 text-gray-700">
        We have acknowledged your booking request. Our reservation team at Hotel Sudarshan will get back to you if the requested dates and rooms are available.
      </p>
      <p className="text-sm mt-4 text-gray-700">
        For more assistance or queries, contact us at{' '}
        <a href="tel:+919070755575" className="text-blue-500">
          +91 9070755755
        </a>{' '}
        or email us at{' '}
        <a href="mailto:contact.hotelsudarshan@gmail.com" className="text-blue-500">
          contact.hotelsudarshan@gmail.com
        </a>.
      </p>

      <p className="text-sm mt-4 text-gray-700">Please refresh the page</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  );
};

export default BookingConfirmation;
