import React from "react";
import Link from "next/link";
import CalendarSearchUI from "../../components/Rooms/CalendarSearchUI";
const HeaderBanner = ({ title, backgroundImage }) => (
  <div
    className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
    <div className="relative z-10 w-full max-w-5xl mx-auto p-4 ">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{title}</h1>
      <div className="text-lg mt-4  mb-4">
        <Link href="/" className="hover:underline">
          Home /
        </Link>
        <span className="text-lg mt-2 pl-2">
          <Link href="/rooms" className="hover:underline">
            Rooms & Suites
          </Link>
        </span>
      </div>
      <div className="  w-full flex items-center justify-center">
      <CalendarSearchUI />
    </div>
    </div>
   
  </div>
);

export default HeaderBanner;
