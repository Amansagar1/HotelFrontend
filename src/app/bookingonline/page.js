/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import bookingData from './bookingData.json';
// import Link from 'next/link';

const BookingOnline = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    rooms: 1,
    guests: 1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="font-sans flex flex-col  w-full items-center justify-center ">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-[400px] w-full flex  items-center justify-center text-center text-white relative" style={{ backgroundImage: `url('${bookingData.heroSection.backgroundImage}')` }}>
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center flex-col">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{bookingData.heroSection.title}</h1>
        </div>
      </div>

      {/* Check Availability Section */}
      <div className="w-[1400px] top-[300px] py-10 px-4 border bg-sky-900 text-white rounded-xl items-center justify-center absolute">
        <h2 className="text-3xl font-semibold text-center ">{bookingData.checkAvailabilitySection.title}</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 w-full">
          {bookingData.checkAvailabilitySection.fields.map((field) => (
            <div key={field.name} className="flex flex-col  ">
              <label htmlFor={field.name} className=" font-semibold mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-2 border rounded text-black"
              />
            </div>
          ))}
          <div className="flex items-center mt-4 w-full">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">{bookingData.checkAvailabilitySection.buttonLabel}</button>
          </div>
        </div>
      </div>

      {/* Room Types Section */}
      <div className="max-w-5xl mx-auto py-10 px-4 mt-48">
        <h2 className="text-3xl font-semibold text-center mb-6">Available Room Types</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookingData.roomTypes.map((room) => (
            <div key={room.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <img src={room.image} alt={room.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{room.title}</h3>
              <p className="text-gray-600 mb-4">{room.description}</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Book Now</button>
            </div>
          ))}
        </div>
      </div>

      Contact Section
      <div className="bg-gray-100 py-10">
        {/* <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-6">{bookingData.contactSection.title}</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookingData.contactSection.details.map((detail) => (
              <div key={detail.label} className="flex flex-col">
                <h3 className="text-xl font-semibold">{detail.label}</h3>
                <p className="text-gray-600">{detail.value}</p>
              </div>
            ))}
          </div> */}

          {/* Contact Form */}
          {/* <div className="mt-10">
            <h3 className="text-2xl font-semibold text-center mb-4">GET IN TOUCH</h3>
            <form className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              {bookingData.contactSection.form.fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label htmlFor={field.name} className="text-lg font-semibold">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      id={field.name}
                      className="p-3 border rounded-md"
                      rows="4"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      className="p-3 border rounded-md"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">{bookingData.contactSection.form.buttonLabel}</button>
              </div>
            </form>
          </div> 
        </div>*/}
      </div>
    </div>
  );
};

export default BookingOnline;
