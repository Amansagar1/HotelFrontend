import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import navLinks from "./Navbar.json"; // Import nav links
// import toast, { Toaster } from 'react-hot-toast';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [navbarBg, setNavbarBg] = useState("bg-transparent"); // Navbar background on scroll
  const [userCardOpen, setUserCardOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
  });

  const { data: session } = useSession();

  const userCardRef = useRef(null); // Reference to the user card element
  const navbarRef = useRef(null); // Reference to the whole navbar container

  // Handle scroll to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg("bg-black"); // Change to solid black on scroll
      } else {
        setNavbarBg("bg-transparent"); // Revert to transparent at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close user card if click is outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userCardOpen &&
        userCardRef.current &&
        !userCardRef.current.contains(event.target) &&
        !navbarRef.current.contains(event.target)
      ) {
        setUserCardOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userCardOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to fetch user data from cookies or session
  useEffect(() => {
    // Sync user data with session and cookies
    const userFullName = Cookies.get("username");
    const userEmail = Cookies.get("email");

    if (session && session.user) {
      setUser({
        name: session.user.username,
        email: session.user.email,
      });
    } else if (userFullName && userEmail) {
      setUser({
        name: userFullName,
        email: userEmail,
      });
    } else {
      setUser({
        name: "Guest User",
        email: "guest@example.com",
      });
    }
  }, [session]);

  // Handle user card toggle
  const toggleUserCard = () => {
    setUserCardOpen((prev) => !prev);
  };

  // Handle sign out
  const handleSignOut = () => {
    Cookies.remove('username');
    Cookies.remove('email');
    signOut(); 
      // toast.success("You have signed out successfully!");
    window.location.href = '/';
  };

  // Function to generate initials from user name
  const getInitials = (name, email) => {
    if (!name && email) {
      const emailName = email.split("@")[0];
      name = emailName;
    }

    const nameArray = name.split(" ");
    const firstNameInitial = nameArray[0]?.charAt(0).toUpperCase();
    const lastNameInitial = nameArray.length > 1 ? nameArray[nameArray.length - 1]?.charAt(0).toUpperCase() : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <div ref={navbarRef} className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarBg}`}>
      {/* <Toaster
  position="bottom-right"
  reverseOrder={false}
/> */}
      <div className="w-full py-2 md:py-1">
        <div className="flex items-center justify-between w-[95%] relative">
          {/* Logo Section */}
          <div className="flex items-center md:pl-14">
            <Link href="/">
              <Image src="/images/logo.png" width={110} height={110} alt="hotellogo" />
            </Link>
          </div>

          {/* Links Section (Desktop) */}
          <div className="hidden md:flex gap-8 items-center text-white">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <span className="hover:text-yellow-500 transition duration-300">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="flex items-center relative">
            {/* User Circle (Right side of Navbar) */}
            <div
              onClick={toggleUserCard} // Toggle the user card on click
              className="cursor-pointer w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden md:flex justify-center items-center bg-black hidden"
            >
              {user?.image ? (
                <Image className="w-full h-full object-cover" src={user.image} alt="user" />
              ) : (
                <span className="text-white text-lg font-semibold">
                  {getInitials(user?.name, user?.email)}
                </span>
              )}
            </div>

            {/* User Card Popup (only visible when userCardOpen is true) */}
            {userCardOpen && (
              <div
                ref={userCardRef}
                className="absolute top-14 right-0 p-4 w-72 z-50 transition-all duration-300 opacity-100 transform translate-x-0 hidden md:block bg-gradient-to-r from-yellow-800  to-yellow-900 rounded-lg shadow-lg "
              >
                <div className="flex justify-between mb-4">
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-white hover:text-red-600"
                  >
                    Sign Out
               
                  </button>
                </div>

                <div className="flex justify-center items-center mb-4">
                  {/* Profile Image Section */}
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-lg "
                    />
                  ) : (
                    <div className="w-24 h-24 flex justify-center items-center rounded-full bg-gray-500 border-4 border-gray-300 ">
                      <span className="text-white text-lg font-semibold">
                        {getInitials(user?.name, user?.email)}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-center text-white">{user.name}</h3>
                <p className="text-sm text-center text-white">{user.email || "No email provided"}</p>

                {/* Additional Information */}
                <div className="mt-4 text-center text-sm text-white">
                  {/* Add jobTitle and phone if available */}
                  {user.jobTitle && <p>{user.jobTitle}</p>}
                  {user.phone && <p>{user.phone}</p>}
                </div>

                {/* Conditional Button Section */}
                <div className="mt-4 flex justify-center space-x-4">
                  {session || (user?.name !== "Guest User" && user?.email !== "guest@example.com") ? (
                    <Link href="/rooms" passHref>
                      <button className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition duration-200">
                        Book Now
                      </button>
                    </Link>
                  ) : (
                    <Link href="/login" passHref>
                      <button className="px-6 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition duration-200">
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white text-3xl transition-transform duration-300">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown on Mobile) */}
      {menuOpen && (
        <div
          className="md:hidden bg-gray-900 text-white p-6 transition-all duration-300 fixed top-0 right-0 h-full w-64 transform ease-in-out z-50 flex flex-col   shadow-lg"
          style={{ transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}
        >
          <div className="w-full flex items-center justify-between ">
            {/* User Profile Section for Mobile */}
            <div
              onClick={toggleUserCard}
              className="cursor-pointer flex items-center justify-center w-16 h-12 rounded-full border-2 border-gray-600 bg-gray-800 hover:bg-gray-700 transition-all duration-200 "
            >
              {user?.image ? (
                <Image className="w-full h-full object-cover rounded-full" src={user.image} alt="user" />
              ) : (
                <span className="text-white  font-semibold">{getInitials(user?.name, user?.email)}</span>
              )}
            </div>
            <button onClick={toggleMenu} className="w-full flex items-center justify-end">
              x
            </button>
          </div>
          {/* Mobile Navigation Links */}
          <div className="flex flex-col w-full  items-center justify-center text-sm ">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={toggleMenu}
                className="w-full p-2 font-medium text-white bg-transparent rounded-lg transition-all duration-200 transform hover:bg-yellow-600 hover:text-gray-900 shadow-lg hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Conditional Mobile Button: Book Now or Login */}
          <div className="mt-2 flex flex-col space-y-4 w-full">
            {session || (user?.name !== "Guest User" && user?.email !== "guest@example.com") ? (
              <Link href="/rooms" passHref>
                <button className="w-full px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-200">
                  Book Now
                </button>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <button className="w-full px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition duration-200">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
