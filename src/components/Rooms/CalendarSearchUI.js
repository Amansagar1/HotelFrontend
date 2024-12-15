
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { getAllBookingRooms } from "../../Webservices/HotelAPIController";

const CalendarSearchUI = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);


  const handleSearch = async () => {
    console.log("Searching for availability...");
    console.log("Check-in Date:", checkIn);
    console.log("Check-out Date:", checkOut);
    console.log("Adults:", adults);
    console.log("Children:", children);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative  w-full p-4  mx-auto flex flex-col lg:flex-row lg:space-x-4">
      {/* Small screen button */}
      <div className="lg:hidden w-full items-center justify-center z-40">
        <button
          onClick={togglePopup}
          className="bg-yellow-600 text-white  text-sm py-3 px-4 rounded-full shadow-md hover:bg-orange-600 transition duration-300"
        >
          Check Availability
        </button>
      </div>

      {/* Popup for Small Screens */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 w-full">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2">
            <div className="w-full flex">

            </div>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Check In</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                   dateFormat="dd/MM/yyyy"
                  className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholderText="DD/MM/YYYY"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Check Out</label>
                <DatePicker
                  selectsEnd
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn}
                   dateFormat="dd/MM/yyyy"
                  className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                 placeholderText="DD/MM/YYYY"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Adults</label>
                <select

                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Children</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <button
                  onClick={handleSearch}
                  className="bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
                >
                  Check Availability
                </button>
                <button
                  onClick={closePopup}
                  className="  bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Large Screens */}
      <div className="hidden lg:flex w-full items-center justify-center gap-4 border shadow-md bg-white p-4">
        <div className="flex flex-col w-full lg:w-1/4 mb-6 lg:mb-0">
          <label className="text-gray-600 text-sm mb-1">Check In</label>
          <DatePicker
            selectsStart
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
           placeholderText="DD/MM/YYYY"
             dateFormat="dd/MM/yyyy"
          />
        </div>
        {/* Check-out Date */}
        <div className="flex flex-col w-full lg:w-1/4 mb-6 lg:mb-0">
          <label className="text-gray-600 text-sm mb-1">Check Out</label>
          <DatePicker
    selected={checkOut}
    onChange={(date) => setCheckOut(date)}
    minDate={checkIn}
            selectsEnd
               dateFormat="dd/MM/yyyy"
            className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
         placeholderText="DD/MM/YYYY"
          />
        </div>
        {/* Adults Dropdown */}
        <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
          <label className="text-gray-600 text-sm mb-1">Adults</label>
          <select

            className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        {/* Children Dropdown */}
        <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
          <label className="text-gray-600 text-sm mb-1">Children</label>
          <select

            className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        {/* Search Button */}
        <div className="w-full lg:w-48  lg:mt-0 flex items-end text-sm ">
          <button
            onClick={handleSearch}
            className="bg-yellow-600 mt-6 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};

// API call function


export default CalendarSearchUI;
