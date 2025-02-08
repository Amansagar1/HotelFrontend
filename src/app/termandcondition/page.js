import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 text-gray-800 w-full">
      <div
        className="w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('/images/rooms/receptionfront.jpg')` }}
      ></div>
      <div className="p-6 md:p-10 lg:px-24 lg:py-16">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        {/* Check-in, Check-out & Charges */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Check-in, Check-out & Charges</h2>
          <ol className="list-decimal ml-6">
            <li className="mb-1">Check-in time is 12:00 PM and checkout time is 11:00 AM. Early check-in and late checkout are subject to availability and may incur charges based on the hotel&apos;s policy.</li>
            <li className="mb-1">Early departure is subject to one night’s charge.</li>
            <li className="mb-1">Applicable GST on room rates: 12% for room rates ≤ ₹7499 and 18% for room rates &gt; ₹7500.</li>
          </ol>
        </section>

        {/* Hotel Policies */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hotel Policies</h2>
          <ol className="list-decimal ml-6">
            <li className="mb-1">Smoking and alcohol consumption are prohibited in public areas, including the lobby, restaurant, and rooms.</li>
            <li className="mb-1">Primary guest should be at least 18 years old.</li>
            <li className="mb-1">Aadhaar, Passport, and Driving License are accepted as ID proofs.</li>
            <li className="mb-1">Pets are allowed with prior approval and information.</li>
            <li className="mb-1">Outside food and non-veg food are not allowed on the premises.</li>
            <li className="mb-1">Alcohol consumption is not allowed in the hotel.</li>
            <li className="mb-1">The property is wheelchair accessible. Guests are requested to carry their own wheelchair.</li>
            <li className="mb-1">Private parties or events are not allowed.</li>
            <li className="mb-1">Guests should not invite outside visitors to their rooms.</li>
            <li className="mb-1">Cab services and Ayodhya sightseeing guides are available for additional charges. Please contact the reception for details.</li>
            <li className="mb-1">A 50% advance is required for booking confirmation. The balance must be paid at least 2 days before check-in.</li>
            <li className="mb-1">Local IDs are not accepted, and unmarried couples are not allowed.</li>
            <li className="mb-1">Non-guaranteed reservations will be released by 18:00 hrs on the arrival date.</li>
            <li className="mb-1">For advance purchase bookings, the full deposit is non-refundable even if the booking is cancelled or modified.</li>
            <li className="mb-1">A minimum of 48 hours' notice is required for cancellations. Cancellations after this will incur one-night's charge.</li>
          </ol>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
          <p className="text-lg leading-relaxed">
            <strong className="font-semibold">1.</strong> Free cancellation is available up to{" "}
            <strong className="font-semibold">2 days before the check-in date</strong>.
            Cancellations are only allowed{" "}
            <strong className="font-semibold">before the Check-In Time</strong>. 
            All times mentioned are in the destination&apos;s local time zone.
          </p>
        </section>

        {/* Additional Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <p className="text-lg leading-relaxed">
            <strong className="font-semibold">2.</strong> Please ensure compliance with hotel policies during your stay. All rooms are equipped with modern amenities such as a telephone, cable television, 
            attached washroom with modern fittings, hot and cold water, and 24-hour room service.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
