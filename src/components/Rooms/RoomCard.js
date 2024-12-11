
import React, { useState } from "react"; 
import Image from "next/image";
// import Modal from "react-modal"; // Importing react-modal
import RoomDetailsPage from "../RoomsDetails/Roomdetails"; 

const RoomCard = ({ room }) => {
  // const [showDetails, setShowDetails] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // const handleShowDetails = () => {
  //   setShowDetails(!showDetails); // Toggle room details visibility
  // };


  // const openModal = () => {
  //   setModalIsOpen(true); // Open the modal when clicking 'Show Room Details'
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false); // Close the modal when clicking 'Close'
  // };

  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col group relative">
      {/* Image */}
      <Image
        src={"/images/img1.jpg"}
        alt={room.type || "Room Image"}
        width={500}
        height={400}
        className="w-full h-[200px] object-cover"
      />

      {/* Room details */}
      <div className="p-4">
        {/* Title and Availability Status */}
        <div className="text-xl font-semibold flex justify-between items-center">
          {room.title}
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              room.available ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {room.available ? "Available" : "Booked"}
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

        {/* Button to show room details */}
       <div className=" w-full flex bg-blue-500 text-white rounded-md shadow-md mt-2 items-center justify-center">
       <button className="p-2 " onClick={() => setShowPopup(true)}>View Room</button>
       </div>
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

