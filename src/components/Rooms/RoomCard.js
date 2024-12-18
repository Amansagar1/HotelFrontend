import React, { useState, useEffect } from "react";
import Image from "next/image";
import RoomDetailsPage from "../RoomsDetails/Roomdetails";
import { getAllBookingRooms } from "../../Webservices/HotelAPIController";

const RoomCard = ({ room }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isBooked, setIsBooked] = useState(false); 
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { result } = await getAllBookingRooms();
        if (result && result.bookings) {
          const currentDate = new Date(); 
          currentDate.setHours(0, 0, 0, 0);
  
          // Check if the room is booked based on roomId and date range
          const bookedRoom = result.bookings.find((booking) => {
            const bookingCheckIn = new Date(booking.checkIn);
            const bookingCheckOut = new Date(booking.checkOut);
  
            // Reset hours to midnight for both booking dates to ensure proper date comparison
            bookingCheckIn.setHours(0, 0, 0, 0);
            bookingCheckOut.setHours(0, 0, 0, 0);
  
            return (
              booking.roomId === room._id &&
              currentDate >= bookingCheckIn &&
              currentDate <= bookingCheckOut &&
              booking.available === "false"
            );
          });
  
          setIsBooked(!!bookedRoom); 
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(!loading); 
      }
    };
  
    fetchBookings();
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
  {room.rating ? (
    <>
      {Array(Math.floor(room.rating))  
        .fill("★")
        .join("")}
      {room.rating % 1 >= 0.5 ? "★" : ""}  
    </>
  ) : "No rating"}
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
            isBooked ? "bg-gray-400" : "bg-yellow-600"
          } text-white   py-2 hover:bg-yellow-700  rounded-md shadow-md mt-2 items-center justify-center`}
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
