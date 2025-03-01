// import React, { useState, useEffect } from "react";
// import { postBookingRoom, PutDeluxeRoom } from "../../Webservices/HotelAPIController"; // Import your API function
// import emailjs from "emailjs-com";
// import Image from "next/image";
// import QRCode from "qrcode.react";
// const BookingModal = ({ isVisible, onClose, roomDetails }) => {
//   const [bookingDetails, setBookingDetails] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     pincode: "",
//     phone: "",
//     email: "",
//     checkIn: "",
//     checkOut: "",
//     checkInTime: "",
//     checkOutTime: "",
//     roomPreference: "",
//     numberOfAdults: "",
//     roomId: roomDetails?._id,
//     price: roomDetails?.price,
//     title: roomDetails?.name,
//     available: "false",
//   });

//   const [isBooked, setIsBooked] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [paymentOption, setPaymentOption] = useState(null);
//   const [upiVisible, setUpiVisible] = useState(false);

//   useEffect(() => {
//     console.log("Room Details:", roomDetails);
//   }, [roomDetails]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookingDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: "",
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     Object.keys(bookingDetails).forEach((key) => {
//       if (!bookingDetails[key] && key !== "roomPreference") {
//         newErrors[key] = "This field is required.";
//         console.log(`Field "${key}" is empty.`);
//       }
//     });

//     if (bookingDetails.email && !emailRegex.test(bookingDetails.email)) {
//       newErrors.email = "Please enter a valid email address.";
//       console.log(`Invalid email address: "${bookingDetails.email}"`);
//     }
//     if (bookingDetails.phone && !phoneRegex.test(bookingDetails.phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//       console.log(`Invalid phone number: "${bookingDetails.phone}"`);
//     }
//     if (bookingDetails.checkInTime >= bookingDetails.checkOutTime) {
//       newErrors.checkOutTime = "Check-out time must be later than check-in time.";
//       console.log(
//         `Check-in time "${bookingDetails.checkInTime}" is not earlier than check-out time "${bookingDetails.checkOutTime}".`
//       );
//     }

//     setErrors(newErrors);

//     console.log("Validation Errors:", newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const sendEmails = async (bookingData) => {
//     try {
//       const userEmail = {
//         to_name: `${bookingData.firstName} ${bookingData.lastName}`,
//         to_email: bookingData.email,
//         room_title: bookingData.title,
//         check_in: `${bookingData.checkIn} at ${bookingData.checkInTime}`,
//         check_out: `${bookingData.checkOut} at ${bookingData.checkOutTime}`,
//         price: bookingData.price,
//         number_of_adults: bookingData.numberOfAdults,
//         booking_date: bookingData.bookingDate,
//         phone: bookingData.phone,
//       };

//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2,
//         userEmail,
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
//       );
//       console.log("User email sent successfully to:", bookingData.email);

//       const adminEmail = {
//         to_name: "Hotel Management",
//         to_email: "hotelsudarshan01@gmail.com",
//         user_name: `${bookingData.firstName} ${bookingData.lastName}`,
//         user_email: bookingData.email,
//         phone: bookingData.phone,
//         room_title: bookingData.title,
//         check_in: `${bookingData.checkIn} at ${bookingData.checkInTime}`,
//         check_out: `${bookingData.checkOut} at ${bookingData.checkOutTime}`,
//         price: bookingData.price,
//         number_of_adults: bookingData.numberOfAdults,
//         booking_date: bookingData.bookingDate,
//       };
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2,
//         adminEmail,
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
//       );
//       console.log("Admin email sent successfully to: hotelsudarshan01@gmail.com");
//     } catch (error) {
//       console.error("Error sending emails:", error);
//     }
//   };

//   const convertToIndianDate = (date) => {
//     const [year, month, day] = date.split("-").map(Number);
//     const localDate = new Date(year, month - 1, day);
//     const offsetInMinutes = 330;
//     const istDate = new Date(localDate.getTime() + offsetInMinutes * 60000);

//     const dayFormatted = String(istDate.getDate()).padStart(2, '0');
//     const monthFormatted = String(istDate.getMonth() + 1).padStart(2, '0');
//     const yearFormatted = String(istDate.getFullYear()).slice(2);
//     return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       alert("Please correct the highlighted errors.");
//       return;
//     }
//     setIsSubmitting(true);

//     const localBookingDetails = { ...bookingDetails };
//     if (localBookingDetails.checkIn) {
//       localBookingDetails.checkIn = convertToIndianDate(localBookingDetails.checkIn);
//     }
//     if (localBookingDetails.checkOut) {
//       localBookingDetails.checkOut = convertToIndianDate(localBookingDetails.checkOut);
//     }

//     try {
//       const response = await postBookingRoom(localBookingDetails);
//       console.log("API Response:", response);

//       if (response.success) {
//         await PutDeluxeRoom(localBookingDetails.roomId, { ...roomDetails, available: false });
//         setIsBooked(true);
//         alert("Booking successful!");

//         await sendEmails(localBookingDetails);
//       } else {
//         alert(`Booking failed: ${response.message}`);
//       }
//     } catch (error) {
//       console.error("Error during booking:", error);
//       alert("An error occurred while processing your booking. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
//       <div className="bg-white rounded-lg shadow-xl p-5 w-[800px]">
//         {/* Header */}
//         <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: "url('/images/img4.jpg')" }}>
//           <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-white">
//             <h1 className="text-3xl font-bold">{isBooked ? "Booking Request Confirmed!" : "Complete Your Booking"}</h1>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="p-6">
//           {!isBooked ? (
//             <>
//               <form onSubmit={handleSubmit} className="space-y-4 overflow-scroll h-[500px]">
//                 {/* Form Fields */}
//                 {[
//                   { label: "First Name", name: "firstName" },
//                   { label: "Last Name", name: "lastName" },
//                   { label: "Address", name: "address" },
//                   { label: "City", name: "city" },
//                   { label: "Pincode", name: "pincode" },
//                   { label: "Phone", name: "phone" },
//                   { label: "Email", name: "email" },
//                   { label: "Check-in Date", name: "checkIn", type: "date" },
//                   { label: "Check-out Date", name: "checkOut", type: "date" },
//                   { label: "Check-in Time", name: "checkInTime", type: "time" },
//                   { label: "Check-out Time", name: "checkOutTime", type: "time" },
//                   { label: "Number of Adults", name: "numberOfAdults" },
//                 ].map((field, idx) => (
//                   <div key={idx}>
//                     <label className="block text-sm font-medium text-gray-600">{field.label}</label>
//                     <input
//                       type={field.type || "text"}
//                       name={field.name}
//                       value={bookingDetails[field.name]}
//                       onChange={handleChange}
//                       className={`w-full p-2 border rounded-lg ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
//                     />
//                     {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
//                   </div>
//                 ))}

//                 {/* Payment Options */}

//                <div className="flex w-full items-center justify-end gap-4">
//                {!paymentOption ? (
//                   <div className="flex justify-end gap-4 ">
//                     <button
//                       type="button"
//                       onClick={() => setPaymentOption("UPI")}
//                       className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
//                     >
//                       Pay on UPI
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setPaymentOption("Counter")}
//                       className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600"
//                     >
//                       Pay at Counter
//                     </button>

//                   </div>
//                 ) : paymentOption === "UPI" ? (
//                   <div className="mt-4">
//                     <Image src="/" alt="UPI payment option" />
//                   </div>
//                 ) : (
//                   <div className="text-sm text-red-600">
//                     <p>Warning: <br />Your room number is not confirmed.</p>
//                     <p>Please make the payment at the counter to confirm your room number.</p>
//                   </div>
//                 )}

//                {paymentOption && (
//                   <div className="flex justify-end ">
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className={`bg-blue-500 text-white font-medium p-2 rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
//                     >
//                       {isSubmitting ? "Submitting..." : "Confirm Booking"}
//                     </button>

//                   </div>
//                 )}
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="border bg-blue-500 py-2 px-6 rounded-lg text-white hover:bg-blue-600"
//                 >
//                   Cancel
//                 </button>
//                </div>
//               </form>
//             </>
//           ) : (
//             <div className="text-center p-4">
//               <h2 className="text-2xl text-green-500 font-semibold">Thank you for choosing us!</h2>
//               <p className="mt-4 text-gray-700">Your booking was successful. We look forward to your stay!</p>
//               <button onClick={onClose} className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
//                 Close
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;
import React, { useState, useEffect } from "react";
import { postBookingRoom, submitForm } from "../../Webservices/HotelAPIController";
import PaymentOptions from "./PaymentOptions";
import BookingConfirmation from "./BookingConfirmation";
const INITIAL_BOOKING_STATE = {
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
  numberOfAdults: "",
  roomId: "",
  price: "",
  title: "",
  available: "false",
};

const FORM_FIELDS = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Address", name: "address" },
  { label: "City", name: "city" },
  { label: "Pincode", name: "pincode" },
  { label: "Phone", name: "phone"  },
  { label: "Email", name: "email" },
  { label: "Check-in Date", name: "checkIn", type: "date" },
  { label: "Check-out Date", name: "checkOut", type: "date" },
  { label: "Check-in Time", name: "checkInTime", type: "time" },
  { label: "Check-out Time", name: "checkOutTime", type: "time" },
  { label: "Number of Adults", name: "numberOfAdults" },
];

const BookingModal = ({ isVisible, onClose, roomDetails }) => {
  const [bookingDetails, setBookingDetails] = useState({
    ...INITIAL_BOOKING_STATE,
    roomId: roomDetails?._id,
    price: roomDetails?.price,
    title: roomDetails?.name,
    available: "false",
  });
  const [isBooked, setIsBooked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentOption, setPaymentOption] = useState(null);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  useEffect(() => {
    if (roomDetails) {
      setBookingDetails((prev) => ({
        ...prev,
        roomId: roomDetails._id,
        price: roomDetails.price,
        title: roomDetails.name,
      }));
    }
  }, [roomDetails]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setBookingDetails((prev) => ({ ...prev, [name]: value }));
  //   setErrors((prev) => ({ ...prev, [name]: "" }));
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pincode' && /[^0-9]/.test(value)) {
      return; 
    }
    if (name === 'phone' && /[^0-9+]/.test(value)) {
      return;
    }
  
    // Phone number validation: Check if it's longer than 10 digits
    if (name === 'phone' && value.length > 15) {
      return; // Prevent entering more than 15 characters
    }
  
    // Phone number validation: Check if it's longer than 10 digits and missing country code
    if (name === 'phone') {
      const rawPhoneValue = value.replace(/\+/g, ""); // Remove the "+" for length check
  
      // Case 1: Phone number exceeds 10 digits and does not start with "+"
      if (rawPhoneValue.length > 10 && !value.startsWith("+")) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number seems too long. Please include a country code.",
        }));
      } 
      // Case 2: Phone number exceeds 10 digits, but starts with "+"
      else if (rawPhoneValue.length > 10 && value.startsWith("+")) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      } 
      // Case 3: If phone number is less than or equal to 10 digits, clear the warning/error
      else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
    if (name === 'numberOfAdults') {
      if (value > 50) {
        setErrors((prev) => ({
          ...prev,
          numberOfAdults: "Number of adults cannot exceed 50.",
        }));
        return; // Stop input if it's greater than 50
      } else {
        setErrors((prev) => ({ ...prev, numberOfAdults: "" }));
      }
    }

    setBookingDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^[+]?[0-9]{10,}$/;

    Object.entries(bookingDetails).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required.";
      }
    });

    if (bookingDetails.email && !emailRegex.test(bookingDetails.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (bookingDetails.phone) {
      const rawPhoneValue = bookingDetails.phone.replace(/\+/g, ""); // Remove "+" for checking length
      if (rawPhoneValue.length > 10 && !bookingDetails.phone.startsWith("+")) {
        newErrors.phone = "Phone number seems too long. Please include a country code.";
      }
    }
  
    if (bookingDetails.checkInTime && !bookingDetails.checkOutTime) {
      newErrors.checkOutTime = "Check-out time is required when check-in time is provided.";
    }
    if (!bookingDetails.checkInTime && bookingDetails.checkOutTime) {
      newErrors.checkInTime = "Check-in time is required when check-out time is provided.";
    }

    const checkInDate = new Date(bookingDetails.checkIn);
    const checkOutDate = new Date(bookingDetails.checkOut);
    if (checkOutDate < checkInDate) {
      newErrors.checkOut = "Check-out date must be the same as or later than the check-in date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const convertToIndianDate = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);
    const offsetInMinutes = 330; // IST is UTC +5:30
    const istDate = new Date(localDate.getTime() + offsetInMinutes * 60000);

    const dayFormatted = String(istDate.getDate()).padStart(2, '0');
    const monthFormatted = String(istDate.getMonth() + 1).padStart(2, '0');
    const yearFormatted = String(istDate.getFullYear()).slice(2); // YY format
    return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !paymentOption) {
      alert("Please correct the highlighted errors and select a payment option.");
      return;
    }

    const paymentStatus = isPaymentCompleted ? "paid" : "unpaid";
    const contactNumber = "+91 9070755755";
    const { firstName, lastName, address, city, pincode, phone, email, checkIn, checkOut, checkInTime, checkOutTime, numberOfAdults, price, title } = bookingDetails;

    // Convert dates to ISO format (YYYY-MM-DD) for backend
    const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
    const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];

    // Convert to Indian Date format (DD/MM/YY)
    const indianCheckInDate = convertToIndianDate(formattedCheckIn);
    const indianCheckOutDate = convertToIndianDate(formattedCheckOut);

    // Prepare the message to be sent in the email (you can customize it further)
    const message = `
      Booking Details
     Name:${firstName} ${lastName}
      Address: ${address}, ${city}, ${pincode}
     Phone: ${phone}
     Email: ${email}
     Check-in Date: ${indianCheckInDate}
     Check-out Date: ${indianCheckOutDate}
     Check-in Time: ${checkInTime}
     Check-out Time:${checkOutTime}
     Number of Adults: ${numberOfAdults}
     Room: ${title}
     Price:₹${price}
     Payment Status: ${paymentStatus}
    `;

    // Prepare the form data for submission
    const formData = {
      name: `${firstName} ${lastName}`,
      email: email,
      subject: `Booking Request for ${title}`,
      message: message,
    };

    try {
      setIsSubmitting(true);
      const emailResponse = await submitForm(formData);
      if (emailResponse.error) {
        throw new Error(`Email submission failed: ${emailResponse.error}`);
      } else {
        console.log("Email sent successfully:", emailResponse);
      }
      const bookingPayload = {
        ...bookingDetails,
        checkIn: indianCheckInDate, 
        checkOut: indianCheckOutDate, 
        payment: paymentStatus,
      };

      const bookingResponse = await postBookingRoom(bookingPayload);

      if (bookingResponse.success) {
        setIsBooked(true);
        alert(`Booking successful! Payment status: ${paymentStatus}. For assistance, contact us at ${contactNumber}`);
      } else {
        throw new Error(bookingResponse.message);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert(`Booking failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };



  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
      <div className="bg-white rounded-lg shadow-xl p-5 w-[800px]">
        <div
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/rooms/reception.jpg')" }}
        >
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-white">
            <h1 className="text-3xl font-bold">
              {isBooked ? "Booking Request Confirmed!" : "Complete Your Booking"}
            </h1>
          </div>
        </div>

        <div className="p-6">
          {!isBooked ? (
            <form onSubmit={handleSubmit} className="space-y-4 overflow-scroll h-[500px]">
              {FORM_FIELDS.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-600">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={bookingDetails[field.name]}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg ${errors[field.name] ? "border-red-500" : "border-gray-300"
                      }`}
                      min={field.name === "checkOut" ? bookingDetails.checkIn : undefined}
                      maxLength={field.name === "phone" ? 20 : undefined} 
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">{errors[field.name]}</p>
                  )}
                </div>
              ))}
              <PaymentOptions
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                setIsPaymentCompleted={setIsPaymentCompleted}
              />
              <div className="flex justify-end items-center w-full gap-2"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={` p-2 rounded-lg text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Request Booking"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="border bg-gray-500 py-2 px-6 rounded-lg text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <BookingConfirmation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
