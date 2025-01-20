"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAboutUs } from "../../Webservices/HotelAPIController";

const Aboutus = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const data = await getAboutUs(); 
        setHotelData(data.aboutus);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
    setIsMounted(true);
  }, []);

  if (!isMounted || !hotelData) return null;

  return (
    <div className="font-sans bg-gray-50">
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${hotelData.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full max-w-5xl mx-auto p-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">About Us</h1>
          <div className="text-lg mt-4">
            <Link href="/" passHref>
              <span className="text-lg mt-2 hover:underline ">Home /</span>
            </Link>
            <span className="text-lg mt-2 hover:underline ">
              <Link href="/aboutus"> About Us</Link>
            </span>
          </div>
        </div>
      </div>

      {/* Hotel Introduction Section */}
      <div className="flex flex-col md:flex-row items-center justify-center py-16 bg-white gap-8 md:gap-16 border-b-2 m-5">
        {/* Image Section */}
        <div className="relative flex items-center justify-center mb-8 md:mb-0 w-full md:w-[550px]">
          <Image
            src="/images/hotel-front.jpg"
            alt="Luxury Hotel Room"
            width={1200}
            height={800}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left w-full md:w-[550px]">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
            Luxury Hotel and Resort
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
            {hotelData.hotelIntroduction.title}
          </h2>
          <p className="text-gray-600 mb-8">{hotelData.hotelIntroduction.description}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <span className="text-4xl font-semibold text-yellow-600">{hotelData.hotelIntroduction.luxuryRooms}+</span>
              <p className="text-gray-500">Luxury Rooms</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-semibold text-yellow-600">{hotelData.hotelIntroduction.customerRating}</span>
              <p className="text-gray-500">Customer Ratings</p>
            </div>
          </div>
          {/* <button className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded hover:bg-yellow-700 transition duration-300">
            More About
          </button> */}
        </div>
      </div>

      {/* Room Information Section */}
      <div className="bg-gray-100 py-16">
        <h3 className="text-3xl font-semibold text-center mb-6">Room Types & Details</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {hotelData.roomDetails.map((room, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[400px]">
              <h4 className="text-xl font-semibold mb-4">{room.type}</h4>
              <p className="text-gray-700 mb-4">
                Max {room.maxGuests} Guests | {room.size} | ₹{room.price} + {room.gst}% GST (Total: ₹{room.price + (room.price * room.gst) / 100})
              </p>
              <p className="text-gray-600">{room.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet the Expert Members Section */}
      <div className="py-16">
        <h3 className="text-3xl font-semibold text-center mb-6">Meet the Expert Members</h3>
        <p className="text-center text-gray-600 mb-12">
          Our dedicated team ensures every guest has a memorable stay.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
  {hotelData.teamMembers.map((member, index) => (
    <div key={index} className="text-center">
      <div className="w-[150px] h-[150px] overflow-hidden rounded-full mx-auto">
        <Image
          src={member.image}
          alt={member.name}
          width={150}
          height={150}
          className="object-cover w-full h-full "
          style={{ objectPosition: 'top' }} // Ensures the face is centered
        />
      </div>
      <h4 className="text-lg font-semibold mt-4">{member.name}</h4>
      <p className="text-sm text-gray-500">{member.role}</p>
    </div>
  ))}
</div>


      </div>

      {/* Client Feedback Section */}
      <div className="bg-gray-100 py-16">
        <h3 className="text-3xl font-semibold text-center mb-6">Client Feedback</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {hotelData.clientFeedback.map((feedback, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg text-center w-full md:w-[350px]">
              <p className="text-yellow-500 mb-2">
                {"★".repeat(feedback.rating)}{"☆".repeat(5 - feedback.rating)}
              </p>
              <p className="text-gray-700 mb-4">{feedback.feedback}</p>
              <h5 className="font-semibold">{feedback.name}</h5>
              <p className="text-sm text-gray-500">{feedback.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
