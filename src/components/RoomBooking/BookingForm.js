import React, { useState, useEffect } from "react";
import { postBookingRoom, PutDeluxeRoom } from "../../Webservices/HotelAPIController";
import PaymentOptions from "./PaymentOptions";
import { validateForm } from "../../utils/validators";
import emailjs from "emailjs-com";

const BookingForm = ({
    bookingDetails,
    setBookingDetails,
    roomDetails,
    setIsBooked,
    onClose,
    paymentOption,
    setPaymentOption,
    isPaymentCompleted,
    setIsPaymentCompleted
}) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentHint, setPaymentHint] = useState("");

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

    useEffect(() => {
        const isValid = validateForm(bookingDetails, setErrors);
        if (isValid) {
            setPaymentHint("");
        }
    }, [bookingDetails]);

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
        } catch (error) {
            console.error("Error sending emails:", error);
        }
    };

    const convertToIndianDate = (date) => {
        const [year, month, day] = date.split("-").map(Number);
        const localDate = new Date(year, month - 1, day);
        const offsetInMinutes = 330;
        const istDate = new Date(localDate.getTime() + offsetInMinutes * 60000);
        const dayFormatted = String(istDate.getDate()).padStart(2, "0");
        const monthFormatted = String(istDate.getMonth() + 1).padStart(2, "0");
        const yearFormatted = String(istDate.getFullYear()).slice(2);
        return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!paymentOption) {
            setPaymentHint("Please choose a payment option before submitting.");
            return;
        }

        if (paymentOption === "UPI" && !isPaymentCompleted) {
            setPaymentHint("Please complete the payment before submitting.");
            return;
        }

        if (!validateForm(bookingDetails, setErrors)) {
            setPaymentHint("Please correct the highlighted errors.");
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

    return (
        <form onSubmit={handleSubmit} className="space-y-4 overflow-scroll h-[500px] mt-4">
            {/* Input Fields */}
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
            ].map((field) => (
                <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                    <input
                        type={field.type || "text"}
                        name={field.name}
                        value={bookingDetails[field.name] || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                </div>
            ))}

            {/* Payment Options */}
            <PaymentOptions
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                setIsPaymentCompleted={setIsPaymentCompleted}
            />

            {paymentHint && <p className="text-red-500 text-sm">{paymentHint}</p>}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={!paymentOption || !isPaymentCompleted || isSubmitting}
                    className={`bg-blue-500 text-white font-medium p-2 rounded-lg ${!paymentOption || !isPaymentCompleted || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                >
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </button>
                <button onClick={onClose} type="button" className="ml-4 border bg-gray-500 py-2 px-6 rounded-lg text-white hover:bg-gray-600">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default BookingForm;
