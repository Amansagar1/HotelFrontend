// "use client";
// import React, { useState } from "react";
// import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import Image from "next/image";
// import Link from "next/link";
// import BookingModal from "../RoomBooking/BookingPopup";

// const RoomDetailsPopup = ({ isVisible, onClose, room }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [showModal, setShowModal] = useState(false);

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     const handleBookingSubmit = async (formData) => {
//         const bookingData = {
//             ...formData,
//             roomId: room._id,
//             roomTitle: room.title,
//             roomPrice: room.price,
//         };

//         try {
//             const response = await fetch("/api/book", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(bookingData),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 console.log("Booking confirmed:", data);

//                 await fetch("../../../pages/api/sendMail.js", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         userEmail: data.userEmail,
//                         bookingData,
//                     }),
//                 });
//             } else {
//                 console.error("Booking failed:", data.message);
//             }
//         } catch (error) {
//             console.error("Error during booking:", error);
//         }
//     };

//     if (!isVisible || !room) return null;

//     const images = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg"];

//     const handleNextImage = () => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     const handlePrevImage = () => {
//         setCurrentImageIndex((prevIndex) =>
//             prevIndex === 0 ? images.length - 1 : prevIndex - 1
//         );
//     };

//     const handleBookNow = () => {
//         setShowModal(true);
//     };

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm overflow-auto"
//             role="dialog"
//             aria-modal="true"
//         >
//             <div className="relative w-[95%] md:w-[90%] lg:w-[80%] bg-white rounded-lg shadow-xl overflow-hidden">
//                 {/* Header */}
//                 <div
//                     className="relative w-full h-[200px]  bg-cover bg-center flex items-center justify-center text-white"
//                     style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
//                 >
//                     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//                     <div className="relative z-10 text-center">
//                         <h1 className="text-2xl md:text-3xl font-bold">{room.name}</h1>
//                         <nav className="text-sm mt-2 flex justify-center gap-2 text-gray-300">
//                             <Link href="/" className="hover:underline">
//                                 Home
//                             </Link>
//                             <span>/</span>
//                             <Link href="/rooms" className="hover:underline">
//                                 Rooms & Suites
//                             </Link>
//                         </nav>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className="absolute top-4 right-4 text-white bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-80 transition"
//                         aria-label="Close"
//                     >
//                         <AiOutlineClose size={24} />
//                     </button>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 h-[70vh]  overflow-y-auto">
//                     {/* Left: Image Carousel */}
//                     <div className="relative w-full md:w-1/2  bg-gray-100 rounded-lg ">
//                         <Image
//                             src={images[currentImageIndex]}
//                             alt={`Room Image ${currentImageIndex + 1}`}
//                             className="object-cover w-full h-full"
//                             width={500}
//                             height={500}
//                         />
//                         <button
//                             onClick={handlePrevImage}
//                             className="absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
//                             aria-label="Previous Image"
//                         >
//                             <AiOutlineLeft size={24} />
//                         </button>
//                         <button
//                             onClick={handleNextImage}
//                             className="absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
//                             aria-label="Next Image"
//                         >
//                             <AiOutlineRight size={24} />
//                         </button>
//                     </div>

//          {/* Right: Room Details */}
//          <div className="flex-1 space-y-2   ">
//                                     <h3 className="text-2xl font-semibold">{room.name}</h3>
//                                     <p className="text-md text-gray-600">{room.description || "No description available."}</p>

//                                     {/* Price & Rating */}
//                                     <div className="space-y-2">
//                                         <p className="text-lg font-semibold text-blue-500">
//                                             Price: {room.price ? `₹ ${room.price}` + " /-" : "N/A /-"}
//                                         </p>
//                                         <p className="text-yellow-500 font-bold">
//                                             Rating: {room.rating || "No rating"} ⭐
//                                         </p>
//                                     </div>

//                                     {/* Room Details */}
//                                     <div className="space-y-4">
//                                         {/* Room Size and Occupancy */}
//                                         <div className="flex gap-8 w-full">
//                                             <div className="">
//                                                 <h4 className="text-lg font-semibold">Room Size & Occupancy</h4>
//                                                 <p className="text-gray-700">Size: {room.size || "Not specified"}</p>
//                                                 <p className="text-gray-700">Max Occupancy: {room.maxOccupancy || "Not specified"}</p>
//                                             </div>

//                                             {/* Beds & Blankets */}
//                                             <div>
//                                                 <h4 className="text-lg font-semibold">Beds & Blankets</h4>
//                                                 <ul className="list-disc list-inside text-gray-700">
//                                                     {room.bedsAndBlankets?.length ? (
//                                                         room.bedsAndBlankets.map((item, index) => <li key={index}>{item}</li>)
//                                                     ) : (
//                                                         <li>No information available</li>
//                                                     )}
//                                                 </ul>
//                                             </div>
//                                         </div>

//                                         {/* Safety & Security */}
//                                         <div className="flex gap-24">
//                                             <div className="">
//                                                 <h4 className="text-lg font-semibold">Safety & Security</h4>
//                                                 <ul className="list-disc list-inside text-gray-700">
//                                                     {room.safetyAndSecurity?.length ? (
//                                                         room.safetyAndSecurity.map((item, index) => <li key={index}>{item}</li>)
//                                                     ) : (
//                                                         <li>No information available</li>
//                                                     )}
//                                                 </ul>
//                                             </div>

//                                             <div>
//                                                 <h4 className="text-lg font-semibold">Media & Entertainment</h4>
//                                                 <ul className="list-disc list-inside text-gray-700">
//                                                     {room.mediaAndEntertainment?.length ? (
//                                                         room.mediaAndEntertainment.map((item, index) => <li key={index}>{item}</li>)
//                                                     ) : (
//                                                         <li>No information available</li>
//                                                     )}
//                                                 </ul>
//                                             </div>
//                                         </div>

//                                         {/* Bathroom */}
//                                         <div className="flex gap-24">
//                                             <div>
//                                                 <h4 className="text-lg font-semibold">Bathroom</h4>
//                                                 <ul className="list-disc list-inside text-gray-700">
//                                                     {room.bathroom?.length ? (
//                                                         room.bathroom.map((item, index) => <li key={index}>{item}</li>)
//                                                     ) : (
//                                                         <li>No information available</li>
//                                                     )}
//                                                 </ul>
//                                             </div>

//                                             <div>
//                                                 <h4 className="text-lg font-semibold">Other Facilities</h4>
//                                                 <ul className="list-disc list-inside text-gray-700">
//                                                     {room.otherFacilities?.length ? (
//                                                         room.otherFacilities.map((item, index) => <li key={index}>{item}</li>)
//                                                     ) : (
//                                                         <li>No information available</li>
//                                                     )}
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col gap-2">
//                                         <button
//                                             className={`py-2 rounded-lg font-semibold ${room.available
//                                                 ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
//                                                 : "bg-gray-400 text-gray-600 cursor-not-allowed"
//                                                 }`}
//                                             onClick={handleBookNow}
//                                             disabled={!room.available}
//                                         >
//                                             {room.available ?
//                                                 `Book Now - ₹ ${room.price && !isNaN(room.price) ? Number(room.price).toLocaleString('en-IN') + " /-" : "N/A /-"}`
//                                                 : "Room Unavailable"}


//                                         </button>
//                                         <button className="bg-transparent text-blue-500 font-semibold py-2  mb-4 rounded-lg border border-blue-500">
//                                             Save to Wishlist
//                                         </button>
//                                     </div>
//                                 </div>
//                 </div>

//                 {/* Booking Modal */}
//                 <BookingModal
//                     isVisible={showModal}
//                     onClose={handleCloseModal}
//                     onSubmit={handleBookingSubmit}
//                     roomDetails={room}
//                 />
//             </div>
//         </div>
//     );
// };

// export default RoomDetailsPopup;
"use client";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookingModal from "../RoomBooking/BookingPopup";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies

const RoomDetailsPopup = ({ isVisible, onClose, room }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBookingSubmit = async (formData) => {
        const bookingData = {
            ...formData,
            roomId: room._id,
            roomTitle: room.title,
            roomPrice: room.price,
        };

        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();
            if (data.success) {
                console.log("Booking confirmed:", data);

                await fetch("../../../pages/api/sendMail.js", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userEmail: data.userEmail,
                        bookingData,
                    }),
                });
            } else {
                console.error("Booking failed:", data.message);
            }
        } catch (error) {
            console.error("Error during booking:", error);
        }
    };

    if (!isVisible || !room) return null;

    const images = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg"];

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleBookNow = () => {
        // Check if user data is in cookies
        const userFullName = Cookies.get('userFullName');
        const userEmail = Cookies.get('userEmail');

        if (userFullName && userEmail) {
            setShowModal(true); // Show booking form
        } else {
            router.push("/login"); // Redirect to login page
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm overflow-auto"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-[95%] md:w-[90%] lg:w-[80%] bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div
                    className="relative w-full h-[200px]  bg-cover bg-center flex items-center justify-center text-white"
                    style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold">{room.name}</h1>
                        <nav className="text-sm mt-2 flex justify-center gap-2 text-gray-300">
                            <Link href="/" className="hover:underline">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/rooms" className="hover:underline">
                                Rooms & Suites
                            </Link>
                        </nav>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-80 transition"
                        aria-label="Close"
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 h-[70vh] overflow-y-auto">
                    {/* Left: Image Carousel */}
                    <div className="relative w-full md:w-1/2 bg-gray-100 rounded-lg ">
                        <Image
                            src={images[currentImageIndex]}
                            alt={`Room Image ${currentImageIndex + 1}`}
                            className="object-cover w-full h-full"
                            width={500}
                            height={500}
                        />
                        <button
                            onClick={handlePrevImage}
                            className="absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
                            aria-label="Previous Image"
                        >
                            <AiOutlineLeft size={24} />
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
                            aria-label="Next Image"
                        >
                            <AiOutlineRight size={24} />
                        </button>
                    </div>

                    {/* Right: Room Details */}
                    <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-semibold">{room.name}</h3>
                        <p className="text-md text-gray-600">{room.description || "No description available."}</p>

                        {/* Price & Rating */}
                        <div className="space-y-2">
                            <p className="text-lg font-semibold text-blue-500">
                                Price: {room.price ? `₹ ${room.price}` + " /-" : "N/A /-"}
                            </p>
                            <p className="text-yellow-500 font-bold">
                                Rating: {room.rating || "No rating"} ⭐
                            </p>
                        </div>

                        {/* Room Details */}
                        <div className="space-y-4">
                            {/* Room Size and Occupancy */}
                            <div className="flex gap-8 w-full">
                                <div className="">
                                    <h4 className="text-lg font-semibold">Room Size & Occupancy</h4>
                                    <p className="text-gray-700">Size: {room.size || "Not specified"}</p>
                                    <p className="text-gray-700">Max Occupancy: {room.maxOccupancy || "Not specified"}</p>
                                </div>

                                {/* Beds & Blankets */}
                                <div>
                                    <h4 className="text-lg font-semibold">Beds & Blankets</h4>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {room.bedsAndBlankets?.length ? (
                                            room.bedsAndBlankets.map((item, index) => <li key={index}>{item}</li>)
                                        ) : (
                                            <li>No information available</li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Safety & Security */}
                            <div className="flex gap-24">
                                <div className="">
                                    <h4 className="text-lg font-semibold">Safety & Security</h4>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {room.safetyAndSecurity?.length ? (
                                            room.safetyAndSecurity.map((item, index) => <li key={index}>{item}</li>)
                                        ) : (
                                            <li>No information available</li>
                                        )}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">Media & Entertainment</h4>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {room.mediaAndEntertainment?.length ? (
                                            room.mediaAndEntertainment.map((item, index) => <li key={index}>{item}</li>)
                                        ) : (
                                            <li>No information available</li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Bathroom */}
                            <div className="flex gap-24">
                                <div>
                                    <h4 className="text-lg font-semibold">Bathroom</h4>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {room.bathroom?.length ? (
                                            room.bathroom.map((item, index) => <li key={index}>{item}</li>)
                                        ) : (
                                            <li>No information available</li>
                                        )}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">Other Facilities</h4>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {room.otherFacilities?.length ? (
                                            room.otherFacilities.map((item, index) => <li key={index}>{item}</li>)
                                        ) : (
                                            <li>No information available</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                className={`py-2 rounded-lg font-semibold ${room.available
                                    ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                                    }`}
                                onClick={handleBookNow}
                                disabled={!room.available}
                            >
                                {room.available ?
                                    `Book Now - ₹ ${room.price && !isNaN(room.price) ? Number(room.price).toLocaleString('en-IN') + " /-" : "N/A /-"}`
                                    : "Room Unavailable"}


                            </button>
                            <button className="bg-transparent text-blue-500 font-semibold py-2  mb-4 rounded-lg border border-blue-500">
                                Save to Wishlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Booking Modal */}
                <BookingModal
                    isVisible={showModal}
                    onClose={handleCloseModal}
                    onSubmit={handleBookingSubmit}
                    roomDetails={room}
                />
            </div>
        </div>
    );
};

export default RoomDetailsPopup;
