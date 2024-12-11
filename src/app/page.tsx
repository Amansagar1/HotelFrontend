import HomePage from "../components/HomePage/HomePage";
import AboutPage from "../components/Abouthotel/Abouthotel";
import MyFacilities from "../components/MyFacilities/MyFacilities";
import RoomsSuites from "../components/RoomsSuites/RoomsSuites";

export const metadata = {
  title: "Hotel Sudarshan",
  description: "Welcome to our luxury hotel. Explore our rooms, facilities, and more!",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-gray-50">
      <HomePage />
      <RoomsSuites />
      <AboutPage />
      <MyFacilities />
    </main>
  );
}
