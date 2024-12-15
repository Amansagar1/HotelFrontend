"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="bg-gray-800 pt-9 w-full flex justify-center">
      <div className="w-full px-6 xl:px-0 p-10 max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & Info Section */}
          <div className="md:w-full text-center md:text-left">
            <h1 className="text-white font-extrabold text-2xl">
              Hotel <span className="text-rose-600">Sudarshan</span>
            </h1>
            <p className="mt-4 text-[15px] font-normal text-white/[80%]">
              Welcome to Hotel Sudarshan, a place where luxury meets comfort. Enjoy a unique experience tailored for your every need. Whether it&apos;s our world-class amenities, rooms, or services, we are here to offer the best stay in town.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              {/* Social Media Links */}
              <Link className="hover:scale-110" target="_blank" href="https://www.facebook.com/SudarshanHotel">
                <FaFacebookF className="text-white" size={30} />
              </Link>
              <Link className="hover:scale-110" target="_blank" href="https://www.linkedin.com/company/sudarshan-hotel">
                <FaLinkedinIn className="text-white" size={30} />
              </Link>
              <Link className="hover:scale-110" target="_blank" href="https://www.instagram.com/sudarshan_hotel">
                <FaInstagram className="text-white" size={30} />
              </Link>
              <Link className="hover:scale-110" target="_blank" href="https://twitter.com/SudarshanHotel">
                <FaTwitter className="text-white" size={30} />
              </Link>
              <Link className="hover:scale-110" target="_blank" href="https://www.youtube.com/channel/sudarshan-hotel">
                <FaYoutube className="text-white" size={30} />
              </Link>
            </div>
          </div>

          {/* Support Info Section */}
          <div className="md:w-full text-center md:text-left">
            <h4 className="font-semibold text-white">Support</h4>
            <p className="mt-4 text-white">For inquiries, call or email:</p>
            <Link href="tel:+1234567890" className="text-white hover:text-rose-600">+91 73919 57555 </Link><br />
            <Link href="mailto:info@sudarshanhotel.com" className="text-white hover:text-rose-600">hotelsudarshan01@gmail.com</Link> <br />
            <Link  className="text-white hover:text-rose-600" href="/">Address :- Janaura Road, Janoura Bypass, Janpad,
            Ayodhya, Uttar Pradesh - 224001, India</Link>
          </div>

          {/* Quick Links Section */}
          <div className="md:w-full text-center md:text-left">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-white/[80%]">
              <li><Link href="/aboutus" className="hover:text-rose-600">About Us</Link></li>
              <li><Link href="/rooms" className="hover:text-rose-600">Rooms</Link></li>
              <li><Link href="/amenities" className="hover:text-rose-600">Amenities</Link></li>
              <li><Link href="/contact" className="hover:text-rose-600">Contact Us</Link></li>
            </ul>
          </div>

          {/* Payment Method Section */}
          <div className="md:w-full text-center md:text-left">
            <h4 className="font-semibold text-white">Payment Method</h4>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="/" className="flex items-center justify-center bg-white p-2">
                <Image src="/images/PaymentLogo/googlepay.png" alt="Google Pay" width="135" height={135} />
              </Link>
              <Link href="/" className="flex items-center justify-center bg-white p-2">
                <Image src="/images/PaymentLogo/phonepay.png" alt="Phone Pay" width="135" height={135} />
              </Link>
              <Link href="/" className="flex items-center justify-center bg-white p-2">
                <Image src="/images/PaymentLogo/paytm.png" alt="Paytm" width="135" height={135} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-8 border-t border-white pt-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-white text-sm">
          <div className="text-white">
            <p>&copy; {year} Hotel Sudarshan . All rights reserved.</p>
          </div>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="text-white hover:text-rose-600">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-white hover:text-rose-600">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
