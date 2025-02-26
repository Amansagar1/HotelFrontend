import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Cookies from 'js-cookie';
import Image from "next/image";

const UserCard = ({ isOpen }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { data: session } = useSession();

  // Function to generate initials from user name or fallback to email
  const getInitials = (name, email) => {
    if (!name && email) {
      const emailName = email.split('@')[0]; 
      name = emailName;
    }

    const nameArray = name.split(' ');
    const firstNameInitial = nameArray[0]?.charAt(0).toUpperCase();
    const lastNameInitial = nameArray.length > 1 ? nameArray[nameArray.length - 1]?.charAt(0).toUpperCase() : '';
    return `${firstNameInitial}${lastNameInitial}`;
  };

  // Effect to check session or cookies for user data
  useEffect(() => {
    const userFullName = Cookies.get('username');
    const userEmail = Cookies.get('email');

    // If cookies exist, use cookies, otherwise fallback to session
    if (userFullName && userEmail) {
      setUserInfo({ name: userFullName, email: userEmail });
    } else if (session && session.user) {
      setUserInfo({ name: session.user.name, email: session.user.email });
    }
  }, [session]);

  // Handle sign out
  const handleSignOut = () => {
    // Clear user-related cookies when signing out
    Cookies.remove('username');
    Cookies.remove('email');
    signOut(); // Proceed with sign out
  };

  if (!userInfo) {
    return null; // If user info is not available, return null (or you can show a loading spinner)
  }

  return (
    <div className={`bg-white shadow-lg absolute z-10 rounded-lg p-4 w-[280px] transition-all duration-300 ${isOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="flex justify-between mb-4">
        <button
          onClick={handleSignOut} // Sign out the user
          className="text-sm text-red-500 hover:text-red-600"
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center items-center mb-4">
        {/* Profile Image Section */}
        {userInfo.image ? (
          <Image
            src={userInfo.image}
            alt={userInfo.name || 'User'}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
        ) : (
          <div className="w-24 h-24 flex justify-center items-center rounded-full bg-gray-300 border-4 border-gray-300">
            <span className="text-white text-lg font-semibold">
              {getInitials(userInfo.name, userInfo.email)} {/* Pass both name and email */}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-center text-gray-800">{userInfo.name}</h3>
      <p className="text-sm text-center text-gray-600">{userInfo.email || 'No email provided'}</p>

      {/* Additional Information */}
      <div className="mt-4 text-center text-sm text-gray-500">
        {userInfo.jobTitle && <p>{userInfo.jobTitle}</p>}
        {userInfo.phone && <p>{userInfo.phone}</p>}
      </div>

      {/* Conditional Button Section */}
      <div className="mt-4 flex justify-center space-x-4">
        {session ? (
          // Show Book Now button if user is logged in
          <Link href="/rooms" passHref>
            <button className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition duration-200">
              Book Now
            </button>
          </Link>
        ) : (
          // Show Login button if user is not logged in
          <Link href="/login" passHref>
            <button className="px-6 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition duration-200">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserCard;