"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaWifi,
  FaParking,
  FaSpa,
  FaSwimmer,
  FaDumbbell,
  FaRegHandSpock,
  FaRegBuilding,
} from "react-icons/fa";
import { getAmenitiesPage } from "../../Webservices/HotelAPIController";

const Amenities = () => {
  const [amenitiesPageData, setAmenitiesPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmount
    async function fetchData() {
      try {
        const pageData = await getAmenitiesPage();
        if (isMounted) {
          setAmenitiesPageData(pageData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { heroSection, diningOptionsSection, amenitiesSection, roomTypes } = amenitiesPageData;

  return (
    <div className="font-sans bg-gray-50 text-black">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url('${heroSection.backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full max-w-5xl mx-auto p-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{heroSection.title}</h1>
          <div className="text-lg mt-4">
            {heroSection.breadcrumbs.map((breadcrumb, index) => (
              <span key={breadcrumb.label + index}>
                <Link href={breadcrumb.url} passHref>
                  <span className="hover:underline text-white">{breadcrumb.label}</span>
                </Link>
                {index < heroSection.breadcrumbs.length - 1 && (
                  <span className="mx-2 text-white">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dining Options Section */}
      <section className="py-16 bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 text-black">
          <h2 className="text-3xl font-semibold text-center mb-8 text-black ">{diningOptionsSection.title}</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {diningOptionsSection.diningOptions.map((option) => (
              <div
                key={option.id || option.title}
                className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="text-sm text-gray-500">
                  <p>
                    <strong>Timing:</strong> {option.timing}
                  </p>
                  <p>
                    <strong>Location:</strong> {option.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      {/* Room Types Section */}
      <section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-semibold text-center mb-8">Our Room Types</h2>
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {roomTypes.map((room, index) => (
        <div
          key={room.id || index} // Ensure room.id or index is used as key
          className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">{room.name}</h3>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <div className="text-sm text-gray-500">
            <p><strong>Price:</strong> {room.price} INR</p>
            <p><strong>Occupancy:</strong> {room.occupancy}</p>
            <p><strong>Size:</strong> {room.size}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Amenities Section */}
      <section className="py-16 bg-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-semibold text-center mb-8">{amenitiesSection.title}</h2>
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {amenitiesSection.amenities.map((amenity, index) => (
        <div
          key={amenity.id || index} // Ensure amenity.id or index is used as key
          className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center"
        >
          <div className="mr-6">
            {/* Dynamic icon based on the 'icon' field */}
            {amenity.icon === "wifi" && <FaWifi className="text-blue-500 text-3xl" />}
            {amenity.icon === "parking" && <FaParking className="text-gray-500 text-3xl" />}
            {amenity.icon === "ac_unit" && <FaRegHandSpock className="text-red-500 text-3xl" />}
            {amenity.icon === "local_laundry_service" && <FaSpa className="text-green-500 text-3xl" />}
            {amenity.icon === "room_service" && <FaRegBuilding className="text-yellow-500 text-3xl" />}
            {amenity.icon === "restaurant" && <FaDumbbell className="text-orange-500 text-3xl" />}
            {amenity.icon === "spa" && <FaSpa className="text-purple-500 text-3xl" />}
            {amenity.icon === "pool" && <FaSwimmer className="text-teal-500 text-3xl" />}
            {amenity.icon === "fitness_center" && <FaDumbbell className="text-red-500 text-3xl" />}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{amenity.name}</h3>
            <p className="text-gray-600">{amenity.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default Amenities;
