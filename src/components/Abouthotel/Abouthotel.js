"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const AboutHotel = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col md:flex-row p-8 w-full items-center justify-between">
      {/* Left Side: Image with Background */}
      <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
        <div className="bg-yellow-600 h-[350px] md:h-[576px] shadow-lg relative w-full md:w-[60%]  ">
          <div
            className="absolute inset-0 flex items-center justify-center mt-4 ml-4"
            style={{
              backgroundImage: "url('/images/front.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>

      {/* Right Side: Text and Stats */}
      <div className="w-full md:w-1/2 px-4 md:px-10">
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
          Luxury Hotel and Resort
        </p>

        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
          Hotel Sudarshan - Best Luxury Stay in Ayodhya, INDIA
        </h2>

        <p className="text-gray-600 mb-8 text-sm sm:text-base w-full leading-relaxed">
          Located in the heart of Ayodhya, Hotel Sudarshan offers the finest in luxury, comfort, and exceptional hospitality. With world-class amenities, expansive rooms, and impeccable service, we ensure every guest feels at home during their stay. Whether you&apos;re here for business or leisure, Hotel Sudarshan provides an unforgettable experience with breathtaking views and exquisite dining.
        </p>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center mb-8 gap-8">
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-semibold text-yellow-600">17+</span>
            <p className="text-gray-500">Luxury Rooms</p>
          </div>
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-semibold text-yellow-600">4.9</span>
            <p className="text-gray-500">Customer Ratings</p>
          </div>
        </div>

        {/* More About Button */}
        <div className="flex items-center justify-center md:block">
          <Link
            href="/aboutus"
            className="px-4 py-3 bg-yellow-600 text-white font-semibold rounded hover:bg-yellow-700 transition duration-300"
          >
            More About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHotel;
