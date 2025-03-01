"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CalendarSearchUI from "../../components/Rooms/CalendarSearchUI";
import carouselImages from "./carouselImages.json";
import Link from "next/link";

const images = carouselImages.images;

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image Slide with Animation */}
      <div className="relative w-full h-full transition-opacity duration-1000 ease-in-out">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Black Transparent Backdrop */}
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              layout="fill"
              objectFit="cover"
              priority={true}
              className="fade-animation"
            />
          </motion.div>
        </AnimatePresence>

        {/* Text Overlay with Animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1 }}
            className="slide-animation"
          >
            <h1 className="text-3xl sm:text-[42px] md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
              Experience Unmatched Luxury at Hotel Sudarshan
            </h1>
            <p className="text-lg md:text-2xl lg:text-4xl mb-6 drop-shadow-md">
              A Premier Destination for Comfort, Elegance, and Serenity
            </p>
            <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded shadow-md">
              <Link href="/rooms">Discover Our Rooms and Services</Link>
            </button>
          </motion.div>
          <div className="w-[80%] flex items-center justify-center p-6">
            <CalendarSearchUI />
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPreviousSlide}
        aria-label="Previous Slide"
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 z-20"
      >
        <FaArrowLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNextSlide}
        aria-label="Next Slide"
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 z-20"
      >
        <FaArrowRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            tabIndex={0}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index
                ? "bg-yellow-500"
                : "bg-gray-300 hover:bg-yellow-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
