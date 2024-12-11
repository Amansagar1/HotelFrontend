
"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { FaWifi, FaParking, FaSpa, FaSwimmer, FaDumbbell, FaRegHandSpock, FaRegBuilding } from 'react-icons/fa';
import amenitiesData from './amenitiesData.json';  
import { getAmenities } from '../../Webservices/HotelAPIController';
const Amenities = () => {
  const [, setisAmenitiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAmenities(); 
        setisAmenitiesData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="font-sans bg-gray-50">

      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white" style={{ backgroundImage: `url('${amenitiesData.heroSection.backgroundImage}')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full max-w-5xl mx-auto p-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{amenitiesData.heroSection.title}</h1>
          <div className="text-lg mt-4">
            {amenitiesData.heroSection.breadcrumbs.map((breadcrumb, index) => (
              <span key={index}>
                <Link href={breadcrumb.url} passHref>
                  <span className="hover:underline text-white">{breadcrumb.label}</span>
                </Link>
                {index < amenitiesData.heroSection.breadcrumbs.length - 1 && <span className="mx-2 text-white">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dining Options Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{amenitiesData.diningOptionsSection.title}</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {amenitiesData.diningOptionsSection.diningOptions.map(option => (
              <div key={option.id} className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="text-sm text-gray-500">
                  <p><strong>Timing:</strong> {option.timing}</p>
                  <p><strong>Location:</strong> {option.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{amenitiesData.restaurantsSection.title}</h2>
          {amenitiesData.restaurantsSection.restaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white p-6 mb-8 shadow-lg rounded-xl flex justify-between items-center border hover:shadow-2xl transition-all transform hover:scale-105">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                <p className="text-sm text-gray-500"><strong>Timing:</strong> {restaurant.timing}</p>
                <p className="text-sm text-gray-500"><strong>Open Days:</strong> {restaurant.openDays}</p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all">Find a Table</button>
            </div>
          ))}
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Room Types</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {amenitiesData.roomTypes.map(room => (
              <div key={room.id} className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
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
          <h2 className="text-3xl font-semibold text-center mb-8">{amenitiesData.amenitiesSection.title}</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {amenitiesData.amenitiesSection.amenities.map(amenity => (
              <div key={amenity.id} className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center">
                <div className="mr-6">
                  {/* Dynamic icon based on the 'icon' field */}
                  {amenity.icon === 'wifi' && <FaWifi className="text-blue-500 text-3xl" />}
                  {amenity.icon === 'parking' && <FaParking className="text-gray-500 text-3xl" />}
                  {amenity.icon === 'ac_unit' && <FaRegHandSpock className="text-red-500 text-3xl" />}
                  {amenity.icon === 'local_laundry_service' && <FaSpa className="text-green-500 text-3xl" />}
                  {amenity.icon === 'room_service' && <FaRegBuilding className="text-yellow-500 text-3xl" />}
                  {amenity.icon === 'restaurant' && <FaDumbbell className="text-orange-500 text-3xl" />}
                  {amenity.icon === 'spa' && <FaSpa className="text-purple-500 text-3xl" />}
                  {amenity.icon === 'pool' && <FaSwimmer className="text-teal-500 text-3xl" />}
                  {amenity.icon === 'fitness_center' && <FaDumbbell className="text-red-500 text-3xl" />}
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
