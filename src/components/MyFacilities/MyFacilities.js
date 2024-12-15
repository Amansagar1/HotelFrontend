"use client";
import React from "react";
import Image from "next/image";
import { FaConciergeBell, FaWifi, FaKey, FaUtensils, FaSwimmingPool } from "react-icons/fa"; 

// Import the facilities data directly
import facilities from "./facilities.json";

const MyFacilities = () => {

  // Map string icon names to actual React components
  const iconMapping = {
    FaConciergeBell: <FaConciergeBell size={48} />,
    FaWifi: <FaWifi size={48} />,
    FaKey: <FaKey size={48} />,
    FaUtensils: <FaUtensils size={48} />,
    // FaSwimmingPool: <FaSwimmingPool size={48} />
  };

  return (
    <section className="bg-gray-900 text-white py-20  w-full">
      <div className="text-center mb-10 px-4 sm:px-8">
        <h2 className="text-3xl font-bold">Hotel Facilities</h2>
        <p className="text-gray-400 mt-2">
          Experience luxury and comfort with the best amenities at Hotel Sudarshan .
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-6 sm:px-10">
        {facilities.map((facility) => (
          <div key={facility.id} className="w-full max-w-xs sm:w-64 h-64">
            {/* Flip Card Container */}
            <div className="flip-card relative w-full h-full bg-gray-800 rounded-lg shadow-lg">

              {/* Flip Card Inner */}
              <div className="flip-card-inner">

                {/* Front Side - Icon and Text */}
                <div className="front-side absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 sm:p-6">
                  <div className="text-yellow-400 mb-4">{iconMapping[facility.icon]}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-center">{facility.name}</h3>
                </div>

                {/* Back Side - Image Only */}
                <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyFacilities;
