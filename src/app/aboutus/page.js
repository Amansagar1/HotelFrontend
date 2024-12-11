"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import teamMembers from "./teamMembers.json";
import clientFeedback from "./clientFeedback.json";

const Aboutus = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="font-sans bg-gray-50">
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url('/images/img5.jpg')` }}
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
      <div className="flex flex-col md:flex-row items-center justify-center py-16 bg-white gap-8 md:gap-16 border-b-2 m-5  ">
        {/* Image Section */}
        <div className="relative flex items-center justify-center mb-8 md:mb-0 w-full md:w-[550px]">
          <Image
            src="/images/img4.jpg"
            alt="Luxury Hotel Room"
            width={550}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left w-full md:w-[550px]">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
            Luxury Hotel and Resort
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
            Hotel Sudarshan - Best Luxury Stay in Ayodhya, INDIA
          </h2>
          <p className="text-gray-600 mb-8">
            Located in the heart of Ayodhya, Hotel Sudarshan offers luxurious accommodations with world-class amenities. With spacious rooms, exquisite dining, and impeccable hospitality, we aim to make every guest&apos;s stay unforgettable. Whether you&apos;re here for business or leisure, experience the perfect blend of comfort and elegance.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <span className="text-4xl font-semibold text-yellow-600">17+</span>
              <p className="text-gray-500">Luxury Rooms</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-semibold text-yellow-600">4.9</span>
              <p className="text-gray-500">Customer Ratings</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded hover:bg-yellow-700 transition duration-300">
            More About
          </button>
        </div>
      </div>

      {/* Room Information Section */}
      <div className="bg-gray-100 py-16">
        <h3 className="text-3xl font-semibold text-center mb-6">Room Types & Details</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[400px]">
            <h4 className="text-xl font-semibold mb-4">Deluxe Room</h4>
            <p className="text-gray-700 mb-4">
              Max 2 Guests | 150 sq ft | ₹3800 + 18% GST (Total: ₹4484)
            </p>
            <p className="text-gray-600">
              Overlooking the airport, these air-conditioned rooms come with a double bed, 2-seater sofa, tea/coffee maker, and modern bathroom amenities. 24-hour room service is available.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[400px]">
            <h4 className="text-xl font-semibold mb-4">Super Deluxe Room</h4>
            <p className="text-gray-700 mb-4">
              Max 3 Guests | 180 sq ft | ₹4600 + 18% GST (Total: ₹5428)
            </p>
            <p className="text-gray-600">
              Spacious and serene, this room offers a double bed, seating area, and blackout curtains. Amenities include a smart TV, 24-hour room service, and air conditioning.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[400px]">
            <h4 className="text-xl font-semibold mb-4">Family Room</h4>
            <p className="text-gray-700 mb-4">
              Max 5 Guests | 250 sq ft | ₹5800 + 18% GST (Total: ₹6844)
            </p>
            <p className="text-gray-600">
              Perfect for families, this room includes a double bed, single bed, and a cozy seating area. Modern amenities ensure a comfortable and enjoyable stay.
            </p>
          </div>
        </div>
      </div>

      {/* Remaining Sections */}
      <div className="py-16">
        <h3 className="text-3xl font-semibold text-center mb-6">Meet the Expert Members</h3>
        <p className="text-center text-gray-600 mb-12">
          Our dedicated team ensures every guest has a memorable stay.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full shadow-lg"
              />
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
          {clientFeedback.map((feedback, index) => (
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
