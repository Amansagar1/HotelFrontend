"use client";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className=" bg-gray-50 text-gray-800 w-full">
       <div
                    className=" w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white"
                    style={{ backgroundImage: `url('/images/rooms/receptionfront.jpg')` }}
                ></div>
    <div className="p-6 md:p-10 lg:px-24 lg:py-16">
    <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

{/* Cancellation Policy */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
  <p className="text-lg leading-relaxed">
    Free cancellation is available up to{" "}
    <strong className="font-semibold">2 days before the check-in date</strong>. 
    Cancellations are only allowed{" "}
    <strong className="font-semibold">before the Check-In Time</strong>. 
    All times mentioned are in the destination&apos;s local time zone.
  </p>
</section>

{/* Room Types and Details */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">Room Types and Details</h2>

  {/* Deluxe Room */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">Deluxe Room</h3>
    <ul className="list-disc ml-6">
      <li className="mb-1">Max Occupancy: 2 Guests</li>
      <li className="mb-1">Price: ₹3,500 + taxes</li>
      <li className="mb-1">Room Size: 150 sq ft</li>
      <li className="mb-1">
        Amenities: Air Conditioning, Wi-Fi, Double Bed, TV, Shower, Toiletries
      </li>
    </ul>
  </div>

  {/* Super Deluxe Room */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">Super Deluxe Room</h3>
    <ul className="list-disc ml-6">
      <li className="mb-1">Max Occupancy: 3 Guests</li>
      <li className="mb-1">Price: ₹4,500 + taxes</li>
      <li className="mb-1">Room Size: 180 sq ft</li>
      <li className="mb-1">
        Amenities: Air Conditioning, Wi-Fi, Double Bed, TV, Shower, Toiletries, Seating Area
      </li>
    </ul>
  </div>

  {/* Family Room */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">Family Room</h3>
    <ul className="list-disc ml-6">
      <li className="mb-1">Max Occupancy: 5 Guests</li>
      <li className="mb-1">Price: ₹5,500 + taxes </li>
      <li className="mb-1">Room Size: 250 sq ft</li>
      <li className="mb-1">
        Amenities: Air Conditioning, Wi-Fi, Double Bed, Single Bed, TV, Shower, Toiletries
      </li>
    </ul>
  </div>
</section>

{/* Additional Information */}
<section>
  <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
  <p className="text-lg leading-relaxed">
    All rooms are equipped with modern amenities such as a telephone, cable television, 
    attached washroom with modern fittings, hot and cold water, and 24-hour room service.
    Please ensure compliance with hotel policies during your stay.
  </p>
</section>
</div>
    </div>
  );
};

export default TermsAndConditions;
