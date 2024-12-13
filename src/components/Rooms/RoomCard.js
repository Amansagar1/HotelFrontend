// import React, { useState } from "react";
// import Image from "next/image";
// import RoomDetailsPage from "../RoomsDetails/Roomdetails";

// const RoomCard = ({ room }) => {
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col group relative w-full">

//       <div className="absolute flex w-full items-center justify-end p-4">
//         <p className=" text-white bg-yellow-600 rounded-lg  text-sm w-20 items-center justify-center flex  p-1 ">
//           {room.price ? `₹${room.price}` + " /-" : "N/A /-"}
//         </p>
//       </div>
//       {/* Image */}
//       <Image
//         src={"/images/img1.jpg"}
//         alt={room.type || "Room Image"}
//         width={500}
//         height={400}
//         className="w-full h-[200px] object-cover"
//       />

//       {/* Room details */}
//       <div className="p-4">
//         {/* Title and Availability Status */}
//         <div className="text-xl font-semibold flex justify-between items-center">
//           {room.name}
//           <span
//             className={`text-xs px-2 py-1 rounded-full ${room.available ? "bg-green-500" : "bg-red-500"
//               } text-white`}
//           >
//             {room.available ? "Available" : "Booked"}
//           </span>
//         </div>

//         {/* Rating */}
//         <p className="text-yellow-500 mt-2">
//           {room.rating ? Array(room.rating).fill("★").join("") : "No rating"}
//         </p>

//         {/* Always Visible Room Details */}
//         <div className="text-sm flex flex-col gap-2 mt-2">
//           <div className="truncate flex gap-2">
//             <h1 className="font-semibold">Room Number :</h1>
//             <h1>{room.roomnumber || "Not available"}</h1>
//           </div>

//           <div className="truncate flex gap-2">
//             <h1 className="font-semibold">Size :</h1>
//             <h1>{room.size ? `${room.size} sq ft` : "Size not available"}</h1>
//           </div>
//           <div className="truncate flex gap-2">
//             <h1 className="font-semibold">Max Occupancy :</h1>
//             <h1>{room.maxOccupancy || "Not specified"}</h1>
//           </div>
//           <div className="truncate flex gap-2">
//             <h1 className="font-semibold">Beds & Blankets :</h1>
//             <h1>{room.bedsAndBlankets || "Bed And Blanket not specified"}</h1>
//           </div>
//           <div className="truncate flex gap-2">
//             <h1 className="font-semibold">Features :</h1>
//             <h1>{room.features ? room.features.join(", ") : "No features listed"}</h1>
//           </div>
//           <div className="truncate flex gap-2">
//             <h1 className="font-semibold">Amenities :</h1>
//             <h1>{room.amenities ? room.amenities.join(", ") : "No amenities listed"}</h1>
//           </div>
//           <div className="truncate flex gap-2">
//             <h1 className="font-semibold">Safety & Security :</h1>
//             <h1>{room.safetyAndSecurity ? room.safetyAndSecurity.join(", ") : "No safety features listed"}</h1>
//           </div>
//         </div>

//         {/* Button to show room details */}
//         <button
//           onClick={() => setShowPopup(true)}
//           className="p-2 w-full flex bg-blue-500 text-white rounded-md shadow-md mt-2 items-center justify-center"
//         >
//           View Room
//         </button>

//         <RoomDetailsPage
//           isVisible={showPopup}
//           onClose={() => setShowPopup(false)}
//           room={room}
//         />
//       </div>
//     </div>
//   );
// };

// export default RoomCard;
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RoomDetailsPage from "../RoomsDetails/Roomdetails";
import { getAllBookingRooms } from "../../Webservices/HotelAPIController";

const RoomCard = ({ room }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isBooked, setIsBooked] = useState(false); // To track booking status

  useEffect(() => {
    // Fetch bookings and check if the current room is booked
    getAllBookingRooms().then(({ result }) => {
      if (result && result.bookings) {
        // Check if the current room's `id` matches any `roomId` in the bookings API
        const bookedRoom = result.bookings.find(
          (booking) => booking.roomId === room._id && booking.available === "false"
        );
        setIsBooked(!!bookedRoom); // Set true if the room is booked
      } else {
        console.error("Failed to fetch booking data.");
      }
    });
  }, [room._id]);

  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col group relative w-full">
      {/* Price */}
      <div className="absolute flex w-full items-center justify-end p-4">
        <p className="text-white bg-yellow-600 rounded-lg text-sm w-20 items-center justify-center flex p-1">
          {room.price ? `₹${room.price} /-` : "N/A /-"}
        </p>
      </div>

      {/* Image */}
      <Image
        src={"/images/img1.jpg"}
        alt={room.name || "Room Image"}
        width={500}
        height={400}
        className="w-full h-[200px] object-cover"
      />

      {/* Room details */}
   

             {/* Room details */}
       <div className="p-4">
         {/* Title and Availability Status */}
         <div className="text-xl font-semibold flex justify-between items-center">
           {room.name}
           <span
            className={`text-xs px-2 py-1 rounded-full ${
              isBooked ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isBooked ? "Booked" : "Available"}
          </span>
        </div>

        {/* Rating */}
        <p className="text-yellow-500 mt-2">
          {room.rating ? Array(room.rating).fill("★").join("") : "No rating"}
        </p>

        {/* Always Visible Room Details */}
        <div className="text-sm flex flex-col gap-2 mt-2">
          <div className="truncate flex gap-2">
            <h1 className="font-semibold">Room Number :</h1>
            <h1>{room.roomnumber || "Not available"}</h1>
          </div>

          <div className="truncate flex gap-2">
            <h1 className="font-semibold">Size :</h1>
            <h1>{room.size ? `${room.size} sq ft` : "Size not available"}</h1>
          </div>
          <div className="truncate flex gap-2">
            <h1 className="font-semibold">Max Occupancy :</h1>
            <h1>{room.maxOccupancy || "Not specified"}</h1>
          </div>
          <div className="truncate flex gap-2">
            <h1 className="font-semibold">Beds & Blankets :</h1>
            <h1>{room.bedsAndBlankets || "Bed And Blanket not specified"}</h1>
          </div>
          <div className="truncate flex gap-2">
            <h1 className="font-semibold">Features :</h1>
            <h1>{room.features ? room.features.join(", ") : "No features listed"}</h1>
          </div>
          <div className="truncate flex gap-2">
            <h1 className="font-semibold">Amenities :</h1>
            <h1>{room.amenities ? room.amenities.join(", ") : "No amenities listed"}</h1>
          </div>
          <div className="truncate flex gap-2">
            <h1 className="font-semibold">Safety & Security :</h1>
            <h1>{room.safetyAndSecurity ? room.safetyAndSecurity.join(", ") : "No safety features listed"}</h1>
          </div>
        </div>
      
        {/* Button */}
        <button
          onClick={() => setShowPopup(true)}
          className={`p-2 w-full flex ${
            isBooked ? "bg-gray-400" : "bg-blue-500"
          } text-white rounded-md shadow-md mt-2 items-center justify-center`}
          disabled={isBooked}
        >
          {isBooked ? "Booked" : "View Room"}
        </button>

        <RoomDetailsPage
          isVisible={showPopup}
          onClose={() => setShowPopup(false)}
          room={room}
        />
      </div>
    </div>
  );
};

export default RoomCard;
