// "use client";
// import React, { useEffect, useState } from "react";
// import { getAllRoomsDetails } from "../../Webservices/HotelAPIController";
// import FilterSidebar from "../../components/Rooms/FilterSidebar";
// import HeaderBanner from "../../components/Rooms/HeaderBanner";
// import RoomCard from "../../components/Rooms/RoomCard";

// const RoomPage = () => {
//   const [rooms, setRooms] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);
//   const [filters, setFilters] = useState({
//     size: { small: false, medium: false, large: false },
//     occupancy: { single: false, double: false, family: false },
//     propertyType: { hotels: false, homestays: false },
//     amenities: {
//       airConditioning: false,
//       housekeeping: false,
//       wifi: false,
//       intercom: false,
//       smartTv: false,
//       fan: false,
//       geyser: false,
//       toiletries: false,
//       hotColdWater: false,
//       coffeeKettle: false,
//       sofa: false,
//       safety: false,
//       breakfast: false,
//     },
//     availability: { available: false, booked: false },
//     rating: { oneStar: false, twoStars: false, threeStars: false, fourStars: false, fiveStars: false },
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const data = await getAllRoomsDetails();
//         if (data?.result && Array.isArray(data.result)) {
//           const processedRooms = data.result.map((room) => ({
//             ...room,
//             size: room.title.includes("Deluxe") ? 150 : room.title.includes("Super Deluxe") ? 180 : room.title.includes("Family") ? 250 : 0,
//             maxOccupancy: room.title.includes("Family") ? 4 : room.title.includes("Super Deluxe") ? 3 : 2,
//             bedType: room.title.includes("Family") ? "1 double bed + 1 single bed" : "1 double bed",
//           }));
//           setRooms(processedRooms);
//           setFilteredRooms(processedRooms);
//         } else {
//           setError("Failed to fetch rooms data.");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching rooms data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRooms();
//   }, []);

//   useEffect(() => {
//     const applyFilters = () => {
//       let filtered = [...rooms];
//       const { size, occupancy, propertyType, availability, rating, amenities } = filters;

//       // Apply each filter
//       if (size.small) filtered = filtered.filter((r) => r.size <= 180);
//       if (size.medium) filtered = filtered.filter((r) => r.size > 180 && r.size <= 250);
//       if (size.large) filtered = filtered.filter((r) => r.size > 250);
//       if (occupancy.single) filtered = filtered.filter((r) => r.maxOccupancy === 1);
//       if (occupancy.double) filtered = filtered.filter((r) => r.maxOccupancy === 2);
//       if (occupancy.family) filtered = filtered.filter((r) => r.maxOccupancy >= 4);
//       if (propertyType.hotels) filtered = filtered.filter((r) => r.propertyType === "Hotel");
//       if (propertyType.homestays) filtered = filtered.filter((r) => r.propertyType === "Homestay");
//       if (availability.available) filtered = filtered.filter((r) => r.available === true);
//       if (availability.booked) filtered = filtered.filter((r) => r.available === false);
//       if (rating.oneStar) filtered = filtered.filter((r) => r.rating === 1);
//       if (rating.twoStars) filtered = filtered.filter((r) => r.rating === 2);
//       if (rating.threeStars) filtered = filtered.filter((r) => r.rating === 3);
//       if (rating.fourStars) filtered = filtered.filter((r) => r.rating === 4);
//       if (rating.fiveStars) filtered = filtered.filter((r) => r.rating === 5);
//       Object.keys(amenities).forEach((amenity) => {
//         if (amenities[amenity]) filtered = filtered.filter((r) => r.features.includes(amenity));
//       });

//       setFilteredRooms(filtered);
//     };
//     applyFilters();
//   }, [filters, rooms]);

//   const toggleFilter = (category, filter) => {
//     setFilters((prev) => ({
//       ...prev,
//       [category]: { ...prev[category], [filter]: !prev[category][filter] },
//     }));
//   };

//   if (loading || error) {
//     return (
//       <div>
//         {/* Header Banner Always Visible */}
//         <HeaderBanner title="Rooms & Suites" backgroundImage="/images/img2.jpg" />

//         {/* Loading Placeholder for Full Page */}
//         <div className="flex flex-wrap p-5">
//           {/* Filter Sidebar Placeholder */}
//           <div className="w-full md:w-1/ p-4">
//             <div className="bg-gray-200 p-4 rounded-lg animate-pulse">
//               <div className="h-8 bg-gray-300 rounded mb-4"></div>
//               <div className="space-y-3">
//                 <div className="h-6 bg-gray-300 rounded"></div>
//                 <div className="h-6 bg-gray-300 rounded"></div>
//                 <div className="h-6 bg-gray-300 rounded"></div>
//               </div>
//             </div>
//           </div>

//           {/* Room Cards Placeholder */}
//           <main className="w-full md:w-3/4 p-6">
//             <h2 className="text-3xl font-semibold mb-6">
//               {loading ? "Loading Rooms..." : "Error Loading Rooms"}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Card Skeletons */}
//               {Array(6)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div
//                     key={index}
//                     className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col group relative animate-pulse"
//                   >
//                     <div className="bg-gray-200 h-[200px] w-full"></div>
//                     <div className="p-4 space-y-3">
//                       <div className="h-6 bg-gray-300 rounded"></div>
//                       <div className="h-6 bg-gray-300 rounded w-24"></div>
//                       <div className="h-8 bg-gray-300 rounded mt-4"></div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Always Display the Header Banner */}
//       <HeaderBanner title="Rooms & Suites" backgroundImage="/images/img2.jpg" />

//       <div className="flex flex-wrap p-5">
//         {/* Filter Sidebar */}
//         <div className="w-full md:w-1/4 p-4">
//           <FilterSidebar filters={filters} toggleFilter={toggleFilter} />
//         </div>

//         {/* Room Cards Section */}
//         <main className="w-full md:w-3/4 p-6">
//           <h2 className="text-3xl font-semibold mb-6">Available Rooms</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredRooms.length > 0 ? (
//               filteredRooms.map((room) => <RoomCard key={room._id} room={room} />)
//             ) : (
//               // Fallback Placeholder if no rooms are found
//               <div className="col-span-full text-center text-gray-600">
//                 No rooms available.
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default RoomPage;
"use client";
"use client";
import React, { useEffect, useState } from "react";
import { getDeluxeRoom, getSuperDeluxeRoom, getFamilyDeluxeRoom } from "../../Webservices/HotelAPIController";
import FilterSidebar from "../../components/Rooms/FilterSidebar";
import HeaderBanner from "../../components/Rooms/HeaderBanner";
import RoomCard from "../../components/Rooms/RoomCard";

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
      geyser: false,
      breakfast: false,
    },
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all room data
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const [deluxeData, superDeluxeData, familyData] = await Promise.all([
          getDeluxeRoom(),
          getSuperDeluxeRoom(),
          getFamilyDeluxeRoom(),
        ]);

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
    <div>
      {/* Header Banner */}
      <HeaderBanner title="Rooms & Suites" backgroundImage="/images/img2.jpg" />

      <div className="flex flex-wrap p-5">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/6 p-4">
          <FilterSidebar filters={filters} toggleFilter={toggleFilter} />
        </div>

        {/* Room Sections */}
        <main className="w-full md:w-3/4 p-6 space-y-10">
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
            <h2 className="text-2xl font-semibold mb-6">Super Deluxe Rooms</h2>
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
            <h2 className="text-2xl font-semibold mb-6">Family Rooms</h2>
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
  );
};

export default RoomPage;
