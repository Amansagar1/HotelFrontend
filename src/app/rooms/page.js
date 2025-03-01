"use client";
"use client";
import React, { useEffect, useState } from "react";
import { getDeluxeRoom, getSuperDeluxeRoom, getFamilyDeluxeRoom } from "../../Webservices/HotelAPIController";
import FilterSidebar from "../../components/Rooms/FilterSidebar";
import HeaderBanner from "../../components/Rooms/HeaderBanner";
import RoomCard from "../../components/Rooms/RoomCard";
import Head from "next/head"; 
const RoomPage = () => {
  const [rooms, setRooms] = useState({
    deluxe: [],
    superDeluxe: [],
    family: [],
  });
  const [filteredRooms, setFilteredRooms] = useState({
    deluxe: [],
    superDeluxe: [],
    family: [],
  });
  const [filters, setFilters] = useState({
    size: { small: false, medium: false, large: false },
    occupancy: { single: false, double: false, family: false },
    amenities: {
      airConditioning: false,
      wifi: false,
      "Geyser/Water Heater": false,
      "Coffee table": false,
    },
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const [deluxeData, superDeluxeData, familyData] = await Promise.all([
          getDeluxeRoom(),
          getSuperDeluxeRoom(),
          getFamilyDeluxeRoom(),
        ]);
        console.log('Deluxe Rooms:', deluxeData?.result);
        console.log('Super Deluxe Rooms:', superDeluxeData?.result);
        console.log('Family Rooms:', familyData?.result);
        setRooms({
          deluxe: deluxeData?.result || [],
          superDeluxe: superDeluxeData?.result || [],
          family: familyData?.result || [],
        });

        // Initialize filteredRooms with all rooms
        setFilteredRooms({
          deluxe: deluxeData?.result || [],
          superDeluxe: superDeluxeData?.result || [],
          family: familyData?.result || [],
        });
      } catch (err) {
        console.error(err);
        setError("Error fetching room data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Apply filters whenever `filters` or `rooms` change
  useEffect(() => {
    const applyFilters = () => {
      const { size, occupancy, amenities } = filters;
      const normalize = (str) => str.toLowerCase().replace(/\s|[-_]/g, "");

      // Helper to parse numeric size from string
      const parseSize = (sizeString) => {
        const match = sizeString.match(/(\d+)/);
        return match ? parseInt(match[0], 10) : null;
      };

      // Filter function
      const filterRooms = (roomList) => {
        return roomList.filter((room) => {
          let isValid = true;

          // Normalize room properties for filtering
          const normalizedRoom = {
            amenities: room.amenities.map(normalize),
            features: room.features.map(normalize),
            bedsAndBlankets: room.bedsAndBlankets.map(normalize),
            safetyAndSecurity: room.safetyAndSecurity.map(normalize),
            mediaAndEntertainment: room.mediaAndEntertainment.map(normalize),
            bathroom: room.bathroom.map(normalize),
            otherFacilities: room.otherFacilities.map(normalize),
          };

          // Apply size filter
          const roomSize = parseSize(room.size);
          if (size.small || size.medium || size.large) {
            if (roomSize) {
              isValid =
                (size.small && roomSize >= 100 && roomSize <= 150) ||
                (size.medium && roomSize >= 151 && roomSize <= 200) ||
                (size.large && roomSize >= 201);
            }
          }

          // Apply occupancy filter
          if (isValid && (occupancy.single || occupancy.double || occupancy.family)) {
            isValid =
              (occupancy.single && room.maxOccupancy === 1) ||
              (occupancy.double && room.maxOccupancy === 2) ||
              (occupancy.family && room.maxOccupancy >= 4);
          }

          // Apply amenities filter
          if (isValid && Object.values(amenities).some((value) => value)) {
            const selectedFilters = Object.keys(amenities).filter((key) => amenities[key]);

            isValid = selectedFilters.some((filter) => {
              const normalizedFilter = normalize(filter);
              return (
                normalizedRoom.amenities.includes(normalizedFilter) ||
                normalizedRoom.features.includes(normalizedFilter) ||
                normalizedRoom.bedsAndBlankets.includes(normalizedFilter) ||
                normalizedRoom.safetyAndSecurity.includes(normalizedFilter) ||
                normalizedRoom.mediaAndEntertainment.includes(normalizedFilter) ||
                normalizedRoom.bathroom.includes(normalizedFilter) ||
                normalizedRoom.otherFacilities.includes(normalizedFilter)
              );
            });
          }

          return isValid;
        });
      };

      // Filter and set rooms
      setFilteredRooms({
        deluxe: filterRooms(rooms.deluxe),
        superDeluxe: filterRooms(rooms.superDeluxe),
        family: filterRooms(rooms.family),
      });
    };

    applyFilters();
  }, [filters, rooms]);


  const toggleFilter = (category, filter) => {
    setFilters((prev) => ({
      ...prev,
      [category]: { ...prev[category], [filter]: !prev[category][filter] },
    }));
  };

  if (loading || error) {
    return (
      <div>
        <HeaderBanner title="Rooms & Suites" backgroundImage="/images/img2.jpg" />
        <div className="text-center py-10">
          {loading ? <p>Loading rooms...</p> : <p>Error: {error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
       {/* SEO */}
       <Head>
        <title>Rooms & Suites - Hotel Booking</title>
        <meta name="description" content="Explore our Deluxe, Super Deluxe, and Family Rooms for your next stay. Find the perfect room with various amenities and options." />
        <meta name="keywords" content="hotel rooms, deluxe rooms, super deluxe rooms, family rooms, hotel booking, accommodation" />
        <meta property="og:title" content="Rooms & Suites - Hotel Booking" />
        <meta property="og:description" content="Explore our Deluxe, Super Deluxe, and Family Rooms for your next stay." />
        <meta property="og:image" content="/images/img2.jpg" />
        <meta property="og:url" content="https://www.hotelsudarshan.com/rooms" />
        <meta name="twitter:title" content="Rooms & Suites - Hotel Booking" />
        <meta name="twitter:description" content="Explore our Deluxe, Super Deluxe, and Family Rooms for your next stay." />
        <meta name="twitter:image" content="/images/img2.jpg" />
      </Head>
      {/* Header Banner */}
      <div className="w-full relative">
        <HeaderBanner className="w-full" title="Rooms & Suites" backgroundImage="/images/img2.jpg" />
      </div>


      <div className="flex w-full p-5">
        {/* Filter Sidebar */}
        <div className="  ">
          <FilterSidebar filters={filters} toggleFilter={toggleFilter} />
        </div>

        {/* Room Sections */}

       <div className="flex w-full flex-col">
     

        <main className="w-full  p-4 h-screen overflow-scroll ">

          {/* Deluxe Rooms */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Deluxe Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.deluxe.length > 0 ? (
                filteredRooms.deluxe.map((room) => <RoomCard key={room._id} room={room} />)
              ) : (
                <p className="col-span-full text-center text-gray-600">No Deluxe Rooms Available.</p>
              )}
            </div>
          </section>

          {/* Super Deluxe Rooms */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 mt-6">Super Deluxe Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.superDeluxe.length > 0 ? (
                filteredRooms.superDeluxe.map((room) => <RoomCard key={room._id} room={room} />)
              ) : (
                <p className="col-span-full text-center text-gray-600">No Super Deluxe Rooms Available.</p>
              )}
            </div>
          </section>

          {/* Family Rooms */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 mt-6">Family Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.family.length > 0 ? (
                filteredRooms.family.map((room) => <RoomCard key={room._id} room={room} />)
              ) : (
                <p className="col-span-full text-center text-gray-600">No Family Rooms Available.</p>
              )}
            </div>
          </section>
        </main>
       </div>
      </div>
    </div>
  );
};

export default RoomPage;