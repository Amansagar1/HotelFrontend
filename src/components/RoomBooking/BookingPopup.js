import React, { useState, useEffect } from "react";
import { postBookingRoom, PutDeluxeRoom } from "../../Webservices/HotelAPIController"; // Import your API function
import emailjs from "emailjs-com";
import Image from "next/image";
const BookingModal = ({ isVisible, onClose, roomDetails }) => {
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    checkInTime: "",
    checkOutTime: "",
    roomPreference: "",
    numberOfAdults: "",
    roomId: roomDetails?._id,
    price: roomDetails?.price,
    title: roomDetails?.name,
    available: "false",
  });

  const [isBooked, setIsBooked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentOption, setPaymentOption] = useState(null);
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);

  useEffect(() => {
    console.log("Room Details:", roomDetails);
  }, [roomDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    Object.keys(bookingDetails).forEach((key) => {
      if (!bookingDetails[key] && key !== "roomPreference") {
        newErrors[key] = "This field is required.";
        console.log(`Field "${key}" is empty.`);
      }
    });

    if (bookingDetails.email && !emailRegex.test(bookingDetails.email)) {
      newErrors.email = "Please enter a valid email address.";
      console.log(`Invalid email address: "${bookingDetails.email}"`);
    }
    if (bookingDetails.phone && !phoneRegex.test(bookingDetails.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      console.log(`Invalid phone number: "${bookingDetails.phone}"`);
    }
    if (bookingDetails.checkInTime >= bookingDetails.checkOutTime) {
      newErrors.checkOutTime = "Check-out time must be later than check-in time.";
      console.log(
        `Check-in time "${bookingDetails.checkInTime}" is not earlier than check-out time "${bookingDetails.checkOutTime}".`
      );
    }

    setErrors(newErrors);

    console.log("Validation Errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmails = async (bookingData) => {
    try {
      const userEmail = {
        to_name: `${bookingData.firstName} ${bookingData.lastName}`,
        to_email: bookingData.email,
        room_title: bookingData.title,
        check_in: `${bookingData.checkIn} at ${bookingData.checkInTime}`,
        check_out: `${bookingData.checkOut} at ${bookingData.checkOutTime}`,
        price: bookingData.price,
        number_of_adults: bookingData.numberOfAdults,
        booking_date: bookingData.bookingDate,
        phone: bookingData.phone,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2,
        userEmail,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      console.log("User email sent successfully to:", bookingData.email);

      const adminEmail = {
        to_name: "Hotel Management",
        to_email: "hotelsudarshan01@gmail.com",
        user_name: `${bookingData.firstName} ${bookingData.lastName}`,
        user_email: bookingData.email,
        phone: bookingData.phone,
        room_title: bookingData.title,
        check_in: `${bookingData.checkIn} at ${bookingData.checkInTime}`,
        check_out: `${bookingData.checkOut} at ${bookingData.checkOutTime}`,
        price: bookingData.price,
        number_of_adults: bookingData.numberOfAdults,
        booking_date: bookingData.bookingDate,
      };
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2,
        adminEmail,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      console.log("Admin email sent successfully to: hotelsudarshan01@gmail.com");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  const convertToIndianDate = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);
    const offsetInMinutes = 330;
    const istDate = new Date(localDate.getTime() + offsetInMinutes * 60000);

    const dayFormatted = String(istDate.getDate()).padStart(2, '0');
    const monthFormatted = String(istDate.getMonth() + 1).padStart(2, '0');
    const yearFormatted = String(istDate.getFullYear()).slice(2);
    return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please correct the highlighted errors.");
      return;
    }
    setIsSubmitting(true);

    const localBookingDetails = { ...bookingDetails };
    if (localBookingDetails.checkIn) {
      localBookingDetails.checkIn = convertToIndianDate(localBookingDetails.checkIn);
    }
    if (localBookingDetails.checkOut) {
      localBookingDetails.checkOut = convertToIndianDate(localBookingDetails.checkOut);
    }

    try {
      const response = await postBookingRoom(localBookingDetails);
      console.log("API Response:", response);

      if (response.success) {
        await PutDeluxeRoom(localBookingDetails.roomId, { ...roomDetails, available: false });
        setIsBooked(true);
        alert("Booking successful!");

        await sendEmails(localBookingDetails);
      } else {
        alert(`Booking failed: ${response.message}`);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred while processing your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
      <div className="bg-white rounded-lg shadow-xl p-5 w-[800px]">
        {/* Header */}
        <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: "url('/images/img4.jpg')" }}>
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-white">
            <h1 className="text-3xl font-bold">{isBooked ? "Booking Confirmed!" : "Complete Your Booking"}</h1>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6">
          {!isBooked ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4 overflow-scroll h-[500px]">
                {/* Form Fields */}
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Address", name: "address" },
                  { label: "City", name: "city" },
                  { label: "Pincode", name: "pincode" },
                  { label: "Phone", name: "phone" },
                  { label: "Email", name: "email" },
                  { label: "Check-in Date", name: "checkIn", type: "date" },
                  { label: "Check-out Date", name: "checkOut", type: "date" },
                  { label: "Check-in Time", name: "checkInTime", type: "time" },
                  { label: "Check-out Time", name: "checkOutTime", type: "time" },
                  { label: "Number of Adults", name: "numberOfAdults" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={bookingDetails[field.name]}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-lg ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                  </div>
                ))}

                {/* Payment Options */}
              
               <div className="flex w-full items-center justify-end gap-4">
               {!paymentOption ? (
                  <div className="flex justify-end gap-4 ">
                    <button
                      type="button"
                      onClick={() => setPaymentOption("UPI")}
                      className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    >
                      Pay on UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentOption("Counter")}
                      className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600"
                    >
                      Pay at Counter
                    </button>
                    
                  </div>
                ) : paymentOption === "UPI" ? (
                  <div className="mt-4">
                    <Image src="/" alt="UPI payment option" />
                  </div>
                ) : (
                  <div className="text-sm text-red-600">
                    <p>Warning: <br />Your room number is not confirmed.</p>
                    <p>Please make the payment at the counter to confirm your room number.</p>
                  </div>
                )}

               {paymentOption && (
                  <div className="flex justify-end ">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-blue-500 text-white font-medium p-2 rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    >
                      {isSubmitting ? "Submitting..." : "Confirm Booking"}
                    </button>

                  </div>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="border bg-blue-500 py-2 px-6 rounded-lg text-white hover:bg-blue-600"
                >
                  Cancel
                </button>
               </div>
              </form>
            </>
          ) : (
            <div className="text-center p-4">
              <h2 className="text-2xl text-green-500 font-semibold">Thank you for choosing us!</h2>
              <p className="mt-4 text-gray-700">Your booking was successful. We look forward to your stay!</p>
              <button onClick={onClose} className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
