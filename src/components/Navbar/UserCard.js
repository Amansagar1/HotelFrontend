import React from "react";
import Link from "next/link";
import Image from "next/image";

const UserCard = ({ isOpen, userInfo, handleSignOut }) => {
  if (!isOpen || !userInfo) return null;

  // Function to generate initials from user name or email
  const getInitials = (username, email) => {
    if (!username && email) {
      const emailName = email.split("@")[0];
      username = emailName;
    }

    const nameArray = username.split(" ");
    const firstNameInitial = nameArray[0]?.charAt(0).toUpperCase();
    const lastNameInitial = nameArray.length > 1 ? nameArray[nameArray.length - 1]?.charAt(0).toUpperCase() : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  // Check if the user is logged in
  const isLoggedIn = userInfo.username !== "Guest User" && userInfo.email !== "guest@example.com";

  return (
    <div className="bg-white shadow-lg absolute z-10 rounded-lg p-4 w-[280px] transition-all duration-300 top-14 right-0">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleSignOut}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center items-center mb-4">
        {userInfo.image ? (
          <Image
            src={userInfo.image}
            alt={userInfo.username || "User"}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
        ) : (
          <div className="w-24 h-24 flex justify-center items-center rounded-full bg-gray-300 border-4 border-gray-300">
            <span className="text-white text-lg font-semibold">
              {getInitials(userInfo.name, userInfo.email)}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-center text-gray-800">{userInfo.username}</h3>
      <p className="text-sm text-center text-gray-600">{userInfo.email || "No email provided"}</p>

      <div className="mt-4 text-center text-sm text-gray-500">
        {userInfo.mobileNumber && <p>{userInfo.mobileNumber}</p>}
      </div>

      <div className="mt-4 flex justify-center">
        {isLoggedIn ? (
          // Show "Book Now" button if user is logged in
          <Link href="/rooms" passHref>
            <button className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition duration-200">
              Book Now
            </button>
          </Link>
        ) : (
          // Show "Login" button if user is not logged in
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