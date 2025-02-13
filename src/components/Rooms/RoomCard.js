import React, { useState, useEffect } from "react";
import Image from "next/image";
import RoomDetailsPage from "../RoomsDetails/Roomdetails";
import { getAllBookingRooms } from "../../Webservices/HotelAPIController";

const RoomCard = ({ room }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({ 
    isBooked: false,
    checkIn: null,
    checkOut: null 
  });
  const [loading, setLoading] = useState(true);

  const formatDateString = (dateStr) => {
    // Convert date from "DD/MM/YY" to a proper Date object
    const [day, month, year] = dateStr.split("/");
    return new Date(`20${year}-${month}-${day}`);
  };

  const isDateInRange = (checkIn, checkOut, targetDate) => {
    const checkInDate = formatDateString(checkIn);
    const checkOutDate = formatDateString(checkOut);
    const target = new Date(targetDate);
    
    // Reset all times to midnight for comparison
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    return target >= checkInDate && target <= checkOutDate;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { result } = await getAllBookingRooms();
        if (result?.bookings) {
          const currentDate = new Date();
          
          const activeBooking = result.bookings.find((booking) => {
            return booking.roomId === room._id && 
                   booking.available === "false" &&
                   isDateInRange(booking.checkIn, booking.checkOut, currentDate);
          });

          if (activeBooking) {
            setBookingStatus({
              isBooked: true,
              checkIn: activeBooking.checkIn,
              checkOut: activeBooking.checkOut
            });
          } else {
            setBookingStatus({
              isBooked: false,
              checkIn: null,
              checkOut: null
            });
          }
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [room._id]);

  const renderBookingStatus = () => {
    if (loading) return null;

    if (bookingStatus.isBooked) {
      return (
        <div className="flex gap-2 items-center justify-center">
         
          <span className="text-xs text-gray-600">
            {`${bookingStatus.checkIn} - ${bookingStatus.checkOut}`}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-red-500 text-white mb-1">
            Booked
          </span>
        </div>
      );
    }

    return (
      <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">
        Available
      </span>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col group relative w-full">
      {/* Price Tag */}
      <div className="absolute flex w-full items-center justify-end p-4">
        <p className="text-white bg-yellow-600 rounded-lg text-sm w-24 items-center justify-center flex p-1">
          {room.price ? `₹${room.price} /-` : "N/A /-"}
        </p>
      </div>

      {/* Room Image */}
      <Image
        src={ room.image ||"/images/rooms/deluxeroom.jpg"}
        alt={room.name || "Room Image"}
        width={500}
        height={400}
        className="w-full h-[200px] object-cover"
      />

      {/* Room Details Section */}
      <div className="p-4">
        {/* Title and Status */}
        <div className="text-xl font-semibold flex justify-between items-start">
          <span className="text-gray-800">{room.name}</span>
          {renderBookingStatus()}
        </div>

        {/* Rating Display */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">
            {room.rating ? (
              <>
                {Array(Math.floor(room.rating))
                  .fill("★")
                  .join("")}
                {room.rating % 1 >= 0.5 ? "★" : ""}
              </>
            ) : "No rating"}
          </span>
        </div>

        {/* Room Details */}
        <div className="text-sm flex flex-col gap-2 mt-4 text-black">
          <DetailRow label="Room Number" value={room.roomnumber} />
          <DetailRow label="Size" value={room.size ? `${room.size}` : null} />
          <DetailRow label="Max Occupancy" value={room.maxOccupancy} />
          <DetailRow label="Beds & Blankets" value={Array.isArray(room.bedsAndBlankets) ? room.bedsAndBlankets.join(", ") : room.bedsAndBlankets} />

          <DetailRow 
            label="Features" 
            value={room.features?.join(", ")} 
            fallback="No features listed"
          />
          <DetailRow 
            label="Amenities" 
            value={room.amenities?.join(", ")} 
            fallback="No amenities listed"
          />
          <DetailRow 
            label="Safety & Security" 
            value={room.safetyAndSecurity?.join(", ")} 
            fallback="No safety features listed"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowPopup(true)}
          className={`w-full mt-4 py-2 px-4 rounded-md shadow-md transition-colors duration-200 ${
            bookingStatus.isBooked 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-yellow-600 hover:bg-yellow-700"
          } text-white font-medium`}
          disabled={bookingStatus.isBooked}
        >
          {bookingStatus.isBooked ? "Booked" : "View Room"}
        </button>

        {/* Room Details Modal */}
        <RoomDetailsPage
          isVisible={showPopup}
          onClose={() => setShowPopup(false)}
          room={room}
        />
      </div>
    </div>
  );
};

// Helper component for detail rows
const DetailRow = ({ label, value, fallback = "Not specified" }) => (
  <div className="flex gap-2 items-start ">
    <span className="font-semibold min-w-[130px]">{label}:</span>
    <span className="text-gray-700">{value || fallback}</span>
  </div>
);

export default RoomCard;

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import RoomDetailsPage from "../RoomsDetails/Roomdetails";
// import { getAllBookingRooms } from "../../Webservices/HotelAPIController";

// const RoomCard = ({ room }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isBooked, setIsBooked] = useState(false); 
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const { result } = await getAllBookingRooms();
//         if (result && result.bookings) {
//           const currentDate = new Date();
//           currentDate.setHours(0, 0, 0, 0);
  
//           const bookedRoom = result.bookings.find((booking) => {
//             return booking.roomId === room._id && booking.available === "false";
//           });
          
  
//           console.log("Booked Room:", bookedRoom); // Log the result
//           setIsBooked(!!bookedRoom);
//         }
//       } catch (error) {
//         console.error("Error fetching booking data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchBookings();
//   }, [room._id]);
  
  
  
  

//   return (
//     <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col group relative w-full">
//       {/* Price */}
//       <div className="absolute flex w-full items-center justify-end p-4">
//         <p className="text-white bg-yellow-600 rounded-lg text-sm w-20 items-center justify-center flex p-1">
//           {room.price ? `₹${room.price} /-` : "N/A /-"}
//         </p>
//       </div>

//       {/* Image */}
//       <Image
//         src={"/images/img1.jpg"}
//         alt={room.name || "Room Image"}
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
//             className={`text-xs px-2 py-1 rounded-full ${
//               isBooked ? "bg-red-500" : "bg-green-500"
//             } text-white`}
//           >
//             {isBooked ? "Booked" : "Available"}
//           </span>
//         </div>

//         {/* Rating */}
//         <p className="text-yellow-500 mt-2">
//   {room.rating ? (
//     <>
//       {Array(Math.floor(room.rating))  
//         .fill("★")
//         .join("")}
//       {room.rating % 1 >= 0.5 ? "★" : ""}  
//     </>
//   ) : "No rating"}
// </p>



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

//         {/* Button */}
//         <button
//           onClick={() => setShowPopup(true)}
//           className={`p-2 w-full flex ${
//             isBooked ? "bg-gray-400" : "bg-yellow-600"
//           } text-white   py-2 hover:bg-yellow-700  rounded-md shadow-md mt-2 items-center justify-center`}
//           disabled={isBooked}
//         >
//           {isBooked ? "Booked" : "View Room"}
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