// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const CalendarSearchUI = () => {
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(1);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleSearch = () => {
//     if (checkInDate && checkOutDate) {
//       console.log(
//         "Checking availability from",
//         checkInDate,
//         "to",
//         checkOutDate,
//         "for",
//         adults,
//         "adults and",
//         children,
//         "children"
//       );
//     } else {
//       alert("Please select both check-in and check-out dates.");
//     }
//   };

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div className="bg-white shadow-xl p-6 rounded-lg w-full  mx-auto flex flex-col lg:flex-row lg:space-x-4 ">
//       {/* On Mobile: Only Show Check Availability Button */}
//       <div className="block lg:hidden w-full">
//         <button
//           onClick={togglePopup}
//           className="bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
//         >
//           Check Availability
//         </button>
//       </div>

//       {/* Popup on Mobile (only shown on small screens) */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 w-full">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 transform transition-all scale-100">
//             {/* Close Button */}
//             <button
//               onClick={closePopup}
//               className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold text-2xl"
//             >
//               &times;
//             </button>

//             <div className="flex flex-col space-y-6">
//               {/* Check-in Date */}
//               <div className="flex flex-col">
//                 <label className="text-gray-600 text-sm mb-1">Check In</label>
//                 <DatePicker
//                   selected={checkInDate}
//                   onChange={(date) => setCheckInDate(date)}
//                   selectsStart
//                   startDate={checkInDate}
//                   endDate={checkOutDate}
//                   minDate={new Date()}
//                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                   placeholderText="MM/DD/YYYY"
//                 />
//               </div>
//               {/* Check-out Date */}
//               <div className="flex flex-col">
//                 <label className="text-gray-600 text-sm mb-1">Check Out</label>
//                 <DatePicker
//                   selected={checkOutDate}
//                   onChange={(date) => setCheckOutDate(date)}
//                   selectsEnd
//                   startDate={checkInDate}
//                   endDate={checkOutDate}
//                   minDate={checkInDate || new Date()}
//                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                   placeholderText="MM/DD/YYYY"
//                 />
//               </div>
//               {/* Adults Dropdown */}
//               <div className="flex flex-col">
//                 <label className="text-gray-600 text-sm mb-1">Adults</label>
//                 <select
//                   value={adults}
//                   onChange={(e) => setAdults(e.target.value)}
//                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                 >
//                   {[...Array(10).keys()].map((num) => (
//                     <option key={num + 1} value={num + 1}>
//                       {num + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* Children Dropdown */}
//               <div className="flex flex-col">
//                 <label className="text-gray-600 text-sm mb-1">Children</label>
//                 <select
//                   value={children}
//                   onChange={(e) => setChildren(e.target.value)}
//                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                 >
//                   {[...Array(10).keys()].map((num) => (
//                     <option key={num + 1} value={num + 1}>
//                       {num + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* Search Button */}
//               <div className="mt-6">
//                 <button
//                   onClick={handleSearch}
//                   className="bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
//                 >
//                   Check Availability
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* On Large Screens: Show Full Form (Tablet and Larger) */}
//       <div className="hidden lg:flex w-full items-center justify-center gap-4">
//         {/* Check-in Date */}
//         <div className="flex flex-col w-full lg:w-1/4 mb-6  lg:mb-0">
//           <label className="text-gray-600 text-sm mb-1">Check In</label>
//           <DatePicker
//             selected={checkInDate}
//             onChange={(date) => setCheckInDate(date)}
//             selectsStart
//             startDate={checkInDate}
//             endDate={checkOutDate}
//             minDate={new Date()}
//             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//             placeholderText="MM/DD/YYYY"
//           />
//         </div>
//         {/* Check-out Date */}
//         <div className="flex flex-col w-full lg:w-1/4 mb-6 lg:mb-0">
//           <label className="text-gray-600 text-sm mb-1">Check Out</label>
//           <DatePicker
//             selected={checkOutDate}
//             onChange={(date) => setCheckOutDate(date)}
//             selectsEnd
//             startDate={checkInDate}
//             endDate={checkOutDate}
//             minDate={checkInDate || new Date()}
//             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//             placeholderText="MM/DD/YYYY"
//           />
//         </div>
//         {/* Adults Dropdown */}
//         <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
//           <label className="text-gray-600 text-sm mb-1">Adults</label>
//           <select
//             value={adults}
//             onChange={(e) => setAdults(e.target.value)}
//             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//           >
//             {[...Array(10).keys()].map((num) => (
//               <option key={num + 1} value={num + 1}>
//                 {num + 1}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* Children Dropdown */}
//         <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
//           <label className="text-gray-600 text-sm mb-1">Children</label>
//           <select
//             value={children}
//             onChange={(e) => setChildren(e.target.value)}
//             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
//           >
//             {[...Array(10).keys()].map((num) => (
//               <option key={num + 1} value={num + 1}>
//                 {num + 1}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* Search Button */}
//         <div className="w-full lg:w-48  lg:mt-0 flex items-end text-sm ">
//           <button
//             onClick={handleSearch}
//             className="bg-yellow-600 mt-6 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
//           >
//             Check Availability
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarSearchUI;
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllBookingRooms } from "../../Webservices/HotelAPIController"; 

const CalendarSearchUI = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = async () => {
    if (checkInDate && checkOutDate) {
      // Check availability from API
      try {
        const response = await getAllBookingRooms();
        const bookedRooms = response.result;

        if (bookedRooms) {
          let isRoomBooked = false;

          // Check if any room is booked during the selected dates
          bookedRooms.forEach((room) => {
            const roomCheckIn = new Date(room.checkInDate);
            const roomCheckOut = new Date(room.checkOutDate);

            // If selected dates overlap with any booking, log that the room is booked
            if (
              (checkInDate >= roomCheckIn && checkInDate <= roomCheckOut) ||
              (checkOutDate >= roomCheckIn && checkOutDate <= roomCheckOut)
            ) {
              isRoomBooked = true;
              console.log(
                `Room ${room.roomNumber} is booked from ${room.checkInDate} to ${room.checkOutDate}.`
              );
            }
          });

          if (!isRoomBooked) {
            console.log(
              "No rooms are booked for the selected dates. You can proceed with booking."
            );
          }
        } else {
          console.log("No booking data found.");
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    } else {
      alert("Please select both check-in and check-out dates.");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-white shadow-xl p-6 rounded-lg w-full mx-auto flex flex-col lg:flex-row lg:space-x-4">
      <div className="block lg:hidden w-full">
        <button
          onClick={togglePopup}
          className="bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
        >
          Check Availability
        </button>
      </div>

      {/* Popup on Mobile (only shown on small screens) */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 w-full">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 transform transition-all scale-100">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold text-2xl"
            >
              &times;
            </button>

            <div className="flex flex-col space-y-6">
              {/* Check-in Date */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Check In</label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholderText="MM/DD/YYYY"
                />
              </div>
              {/* Check-out Date */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Check Out</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={checkInDate || new Date()}
                  className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholderText="MM/DD/YYYY"
                />
              </div>
              {/* Adults Dropdown */}
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
              {/* Children Dropdown */}
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
              {/* Search Button */}
              <div className="mt-6">
                <button
                  onClick={handleSearch}
                  className="bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* On Large Screens: Show Full Form (Tablet and Larger) */}
      <div className="hidden lg:flex w-full items-center justify-center gap-4">
        {/* Check-in Date */}
        <div className="flex flex-col w-full lg:w-1/4 mb-6  lg:mb-0">
          <label className="text-gray-600 text-sm mb-1">Check In</label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={new Date()}
            className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholderText="MM/DD/YYYY"
          />
        </div>
        {/* Check-out Date */}
        <div className="flex flex-col w-full lg:w-1/4 mb-6 lg:mb-0">
          <label className="text-gray-600 text-sm mb-1">Check Out</label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate || new Date()}
            className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholderText="MM/DD/YYYY"
          />
        </div>
        {/* Adults Dropdown */}
        <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
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
        {/* Children Dropdown */}
        <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
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
