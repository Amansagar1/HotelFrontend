"use client";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className=" bg-gray-50 text-gray-800 w-full">
    <div
                 className=" w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white"
                 style={{ backgroundImage: `url('/images/rooms/receptionfront.jpg')` }}
             ></div>
 <div className="p-6 md:p-10 lg:px-24 lg:py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      {/* Introduction */}
      <section className="mb-8">
        <p className="text-lg leading-relaxed">
          At <strong>Hotel Sudarshan</strong>, your privacy is of utmost importance to us. 
          This Privacy Policy outlines how we collect, use, and protect your information 
          when you visit our website or use our services. By accessing or using our website, 
          you agree to the practices described in this policy.
        </p>
      </section>

      {/* Information Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="text-lg leading-relaxed mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            <strong>Personal Information:</strong> Name, email address, phone number, and 
            payment details when making a booking.
          </li>
          <li className="mb-2">
            <strong>Usage Information:</strong> Details about how you interact with our website, 
            including pages visited, time spent on the site, and other analytics data.
          </li>
          <li className="mb-2">
            <strong>Cookies:</strong> Data collected through cookies to enhance your browsing 
            experience and improve our services.
          </li>
        </ul>
      </section>

      {/* Use of Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            To process your bookings and provide a seamless experience during your stay.
          </li>
          <li className="mb-2">To communicate with you regarding reservations or updates.</li>
          <li className="mb-2">To personalize your experience on our website.</li>
          <li className="mb-2">
            To analyze website usage trends and improve our services and offerings.
          </li>
        </ul>
      </section>

      {/* Data Protection */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Protection and Security</h2>
        <p className="text-lg leading-relaxed">
          We implement industry-standard measures to protect your personal information 
          from unauthorized access, disclosure, alteration, or destruction. However, 
          no method of transmission over the internet is completely secure, and we cannot 
          guarantee absolute security.
        </p>
      </section>

      {/* Sharing of Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Sharing of Information</h2>
        <p className="text-lg leading-relaxed mb-4">
          We do not sell or rent your personal information to third parties. We may share 
          your information in the following circumstances:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            With trusted service providers who assist in operating our website and delivering 
            services (e.g., payment processors).
          </li>
          <li className="mb-2">
            To comply with legal obligations, such as responding to subpoenas or court orders.
          </li>
          <li className="mb-2">To protect the rights, property, or safety of our business or users.</li>
        </ul>
      </section>

      {/* User Rights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="text-lg leading-relaxed">
          As a user, you have the right to:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            Access and update your personal information by contacting us.
          </li>
          <li className="mb-2">
            Request the deletion of your data, subject to legal and business record-keeping 
            requirements.
          </li>
          <li className="mb-2">
            Opt out of receiving marketing communications by following the unsubscribe 
            instructions in our emails.
          </li>
        </ul>
      </section>

      {/* Changes to Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
        <p className="text-lg leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our 
          practices or for other operational, legal, or regulatory reasons. The updated 
          policy will be posted on this page with the revision date.
        </p>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
        <p className="text-lg leading-relaxed">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p className="text-lg font-medium mt-2">
          Email: <a href="mailto:contact.hotelsudarshan@gmail.com" className="text-blue-600 underline">contact.hotelsudarshan@gmail.com</a>
        </p>
        <p className="text-lg font-medium">
          Phone: <a href="tel:+91 9070755755" className="text-blue-600 underline">+91 9070755755</a>
        </p>
      </section>
    </div>
    </div>
  );
};

export default PrivacyPolicy;

