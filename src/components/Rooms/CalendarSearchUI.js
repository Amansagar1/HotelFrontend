// // import React, { useState } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { getAllBookingRooms } from "../../Webservices/HotelAPIController";

// // const CalendarSearchUI = () => {
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [checkIn, setCheckIn] = useState(null);
// //   const [checkOut, setCheckOut] = useState(null);
// //   const [adults, setAdults] = useState(1);
// //   const [children, setChildren] = useState(0);
// //   const [availableRooms, setAvailableRooms] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const isRoomAvailable = (room, checkInDate, checkOutDate) => {
// //     // If no bookings exist, the room is available
// //     if (!room.bookings || room.bookings.length === 0) {
// //       return true;
// //     }

// //     // Check if the room is available during the selected date range
// //     const isConflict = room.bookings.some(booking => {
// //       const existingCheckIn = new Date(booking.checkIn);
// //       const existingCheckOut = new Date(booking.checkOut);

// //       // Check for date range overlap
// //       return (
// //         (checkInDate < existingCheckOut && checkOutDate > existingCheckIn) ||
// //         (existingCheckIn <= checkInDate && existingCheckOut >= checkOutDate)
// //       );
// //     });

// //     // Room is available if there's no conflict
// //     return !isConflict;
// //   };

// //   const handleSearch = async () => {
// //     // Validate input
// //     if (!checkIn || !checkOut) {
// //       setError("Please select both check-in and check-out dates");
// //       console.log("No dates selected");
// //       return;
// //     }

// //     if (checkOut <= checkIn) {
// //       setError("Check-out date must be after check-in date");
// //       console.log("Invalid date range: check-out must be after check-in");
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // Fetch all rooms and their bookings
// //       const { result } = await getAllBookingRooms();

// //       if (!result || !result.rooms) {
// //         setError("No rooms found");
// //         setLoading(false);
// //         console.log("No rooms found in the response");
// //         return;
// //       }

// //       // Filter rooms based on availability
// //       const availableRooms = result.rooms.filter(room =>
// //         isRoomAvailable(room, checkIn, checkOut)
// //       );

// //       // Filter rooms based on occupancy
// //       const occupancyFilteredRooms = availableRooms.filter(room =>
// //         room.maxOccupancy >= (adults + children)
// //       );

// //       setAvailableRooms(occupancyFilteredRooms);
// //       setLoading(false);

// //       // Log the available rooms to console
// //       if (occupancyFilteredRooms.length > 0) {
// //         console.log("Available rooms:", occupancyFilteredRooms);
// //       } else {
// //         console.log("No available rooms for the selected dates and occupancy.");
// //       }

// //     } catch (error) {
// //       console.error("Error fetching room availability:", error);
// //       setError("Failed to check room availability");
// //       setLoading(false);
// //       console.log("Error fetching room availability:", error);
// //     }
// //   };


// //   const togglePopup = () => {
// //     setShowPopup(!showPopup);
// //   };

// //   const closePopup = () => {
// //     setShowPopup(false);
// //   };

// //   return (
// //     <div className="relative w-full p-4 mx-auto flex flex-col lg:flex-row lg:space-x-4">
// //       {/* Small screen button */}
// //       <div className="lg:hidden w-full items-center justify-center z-40">
// //         <button
// //           onClick={togglePopup}
// //           className="bg-yellow-600 text-white text-sm py-3 px-4 rounded-full shadow-md hover:bg-orange-600 transition duration-300"
// //         >
// //           Check Availability
// //         </button>
// //       </div>

// //       {/* Popup for Small Screens */}
// //       {showPopup && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 w-full">
// //           <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2">
// //             <div className="flex flex-col space-y-6">
// //               {/* Date Pickers and Dropdowns (Same as before) */}
// //               <div className="flex flex-col">
// //                 <label className="text-gray-600 text-sm mb-1">Check In</label>
// //                 <DatePicker
// //                   selected={checkIn}
// //                   onChange={(date) => setCheckIn(date)}
// //                   selectsStart
// //                   dateFormat="dd/MM/yyyy"
// //                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //                   placeholderText="DD/MM/YYYY"
// //                 />
// //               </div>
// //               <div className="flex flex-col">
// //                 <label className="text-gray-600 text-sm mb-1">Check Out</label>
// //                 <DatePicker
// //                   selectsEnd
// //                   selected={checkOut}
// //                   onChange={(date) => setCheckOut(date)}
// //                   minDate={checkIn}
// //                   dateFormat="dd/MM/yyyy"
// //                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //                   placeholderText="DD/MM/YYYY"
// //                 />
// //               </div>
// //               <div className="flex flex-col">
// //                 <label className="text-gray-600 text-sm mb-1">Adults</label>
// //                 <select
// //                   value={adults}
// //                   onChange={(e) => setAdults(Number(e.target.value))}
// //                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //                 >
// //                   {[...Array(10).keys()].map((num) => (
// //                     <option key={num + 1} value={num + 1}>
// //                       {num + 1}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div className="flex flex-col">
// //                 <label className="text-gray-600 text-sm mb-1">Children</label>
// //                 <select
// //                   value={children}
// //                   onChange={(e) => setChildren(Number(e.target.value))}
// //                   className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //                 >
// //                   {[...Array(10).keys()].map((num) => (
// //                     <option key={num} value={num}>
// //                       {num}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Error and Loading Display */}
// //               {error && (
// //                 <div className="text-red-500 text-sm mb-4">
// //                   {error}
// //                 </div>
// //               )}

// //               {loading && (
// //                 <div className="text-yellow-600 text-sm mb-4">
// //                   Checking availability...
// //                 </div>
// //               )}

// //               {/* Available Rooms Display */}
// //               {!loading && availableRooms.length > 0 && (
// //                 <div className="mt-4">
// //                   <h3 className="text-lg font-semibold mb-2">
// //                     Available Rooms: {availableRooms.length}
// //                   </h3>
// //                   <ul className="space-y-2">
// //                     {availableRooms.map(room => (
// //                       <li
// //                         key={room._id}
// //                         className="bg-green-100 p-2 rounded-md"
// //                       >
// //                         {room.name} (Max Occupancy: {room.maxOccupancy})
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}

// //               {!loading && availableRooms.length === 0 && checkIn && checkOut && (
// //                 <div className="text-red-500 text-sm mb-4">
// //                   No rooms available for the selected dates and occupancy.
// //                 </div>
// //               )}

// //               <div className="mt-6 flex items-center justify-center gap-4 text-sm">
// //                 <button
// //                   onClick={handleSearch}
// //                   className="bg-yellow-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 w-full transition duration-300"
// //                 >
// //                   Check Availability
// //                 </button>
// //                 <button
// //                   onClick={closePopup}
// //                   className="bg-yellow-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 w-full transition duration-300"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       {/* Large Screens */}
// //       <div className="hidden lg:flex w-full items-center justify-center gap-4 border shadow-md bg-white p-4">
// //         <div className="flex flex-col w-full lg:w-1/4 mb-6 lg:mb-0">
// //           <label className="text-gray-600 text-sm mb-1">Check In</label>
// //           <DatePicker
// //             selectsStart
// //             selected={checkIn}
// //             onChange={(date) => setCheckIn(date)}
// //             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //             placeholderText="DD/MM/YYYY"
// //             dateFormat="dd/MM/yyyy"
// //           />
// //         </div>
// //         {/* Check-out Date */}
// //         <div className="flex flex-col w-full lg:w-1/4 mb-6 lg:mb-0">
// //           <label className="text-gray-600 text-sm mb-1">Check Out</label>
// //           <DatePicker
// //             selected={checkOut}
// //             onChange={(date) => setCheckOut(date)}
// //             minDate={checkIn}
// //             selectsEnd
// //             dateFormat="dd/MM/yyyy"
// //             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //             placeholderText="DD/MM/YYYY"
// //           />
// //         </div>
// //         {/* Adults Dropdown */}
// //         <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
// //           <label className="text-gray-600 text-sm mb-1">Adults</label>
// //           <select

// //             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //           >
// //             {[...Array(10).keys()].map((num) => (
// //               <option key={num + 1} value={num + 1}>
// //                 {num + 1}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         {/* Children Dropdown */}
// //         <div className="flex flex-col w-full lg:w-1/6 mb-6 lg:mb-0">
// //           <label className="text-gray-600 text-sm mb-1">Children</label>
// //           <select

// //             className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
// //           >
// //             {[...Array(10).keys()].map((num) => (
// //               <option key={num + 1} value={num + 1}>
// //                 {num + 1}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         {/* Search Button */}
// //         <div className="w-full lg:w-48  lg:mt-0 flex items-end text-sm ">
// //           <button
// //             onClick={handleSearch}
// //             className="bg-yellow-600 mt-6 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 w-full transition duration-300"
// //           >
// //             Check Availability
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };



// // export default CalendarSearchUI;
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const CalendarSearchUI = () => {
  const router = useRouter(); // Initialize router to navigate after form submission
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = () => {
    // Simply redirect to /rooms page after form is filled
    if (checkIn && checkOut) {
      router.push('/rooms');
    } else {
      alert("Please select both check-in and check-out dates.");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative w-full p-4 mx-auto flex flex-col lg:flex-row lg:space-x-4">
      {/* Small screen button */}
      <div className="lg:hidden w-full items-center justify-center z-40">
        <button
          onClick={togglePopup}
          className="bg-yellow-600 text-white text-sm py-3 px-4 rounded-full shadow-md hover:bg-orange-600 transition duration-300"
        >
          Check Availability
        </button>
      </div>

      {/* Popup for Small Screens */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 w-full">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2">
            <div className="flex flex-col space-y-6">
              {/* Date Pickers and Dropdowns */}
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
                  onChange={(e) => setAdults(Number(e.target.value))}
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
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <button
                  onClick={handleSearch}
                  className="bg-yellow-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 w-full transition duration-300"
                >
                  Check Availability
                </button>
                <button
                  onClick={togglePopup}
                  className="bg-yellow-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 w-full transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Large Screens */}
      <div className="hidden lg:flex w-full items-center justify-center gap-4 border shadow-md bg-gray-100 rounded-md p-4">
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
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
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
            onChange={(e) => setChildren(Number(e.target.value))}
            className="border p-3 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        {/* Check availability Button */}
        <div className="lg:w-1/6 mt-6">
          <button
            onClick={handleSearch}
            className="bg-yellow-600 text-white text-sm font-semibold py-3 rounded-md hover:bg-orange-600 w-full transition duration-300"
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarSearchUI;



// import React, { useState } from "react";
// import { fetchAvailableRooms } from "../../Webservices/HotelAPIController";


// export default function AvailabilityChecker() {
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [roomType, setRoomType] = useState('');
//   const [availableRooms, setAvailableRooms] = useState([]);

//   const handleCheckAvailability = async () => {
//     const formattedCheckIn = formatDate(checkIn); // e.g., 25/12/24
//     const formattedCheckOut = formatDate(checkOut); // e.g., 26/12/24
  
//     const rooms = await fetchAvailableRooms(formattedCheckIn, formattedCheckOut, roomType);
//     setAvailableRooms(rooms);
//   };
  
//   // Helper function to format date as dd/mm/yy
//   const formatDate = (date) => {
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year.slice(2)}`; // Convert to dd/mm/yy format
//   };
  
  
//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <label className="block text-gray-700">Check-In Date</label>
//         <input
//           type="date"
//           value={checkIn}
//           onChange={(e) => setCheckIn(e.target.value)}
//           className="border rounded px-3 py-2 w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Check-Out Date</label>
//         <input
//           type="date"
//           value={checkOut}
//           onChange={(e) => setCheckOut(e.target.value)}
//           className="border rounded px-3 py-2 w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Room Type</label>
//         <select
//           value={roomType}
//           onChange={(e) => setRoomType(e.target.value)}
//           className="border rounded px-3 py-2 w-full"
//         >
//           <option value="">All</option>
//           <option value="Deluxe Room">Deluxe Room</option>
//           <option value="Family Room">Family Room</option>
//           <option value="Super Deluxe Room">Super Deluxe Room</option>
//         </select>
//       </div>
//       <button
//         onClick={handleCheckAvailability}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Check Availability
//       </button>
//       {availableRooms.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-bold">Available Rooms:</h3>
//           <ul>
//             {availableRooms.map((room) => (
//               <li key={room._id}>{room.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
