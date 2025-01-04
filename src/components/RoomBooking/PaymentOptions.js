import React, { useState } from "react";
import Image from "next/image";

const PaymentOptions = ({ paymentOption, setPaymentOption, setIsPaymentCompleted }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const handlePaymentDone = () => {
        setPaymentOption("UPI");
        setIsPaymentCompleted(true);
        alert("Payment confirmed. Thank you!");
        closePopup();
    };

    return (
        <div className="payment-options mt-4">
            {/* Payment option selection buttons */}
            {!paymentOption && (
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            setPaymentOption("UPI");
                            openPopup();
                        }}

                        className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    >
                        Pay with UPI
                    </button>
                    <button
                        onClick={() => setPaymentOption("Counter")}
                        className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
                    >
                        Pay at Counter
                    </button>
                </div>
            )}

            {/* UPI Payment Option */}
            {paymentOption === "UPI" && (
                <div className="mt-4">


                    {/* QR Code Popup */}
                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Scan to Pay</h3>
                                <div className="bg-gray-300 flex items-center justify-center rounded-lg mb-4">
                                    <Image
                                        src="/images/qrcode.jpg"
                                        alt="UPI QR Code"
                                        width={200}
                                        height={200}
                                        className="object-center"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Please scan the QR code with your UPI app to complete the payment.
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={handlePaymentDone} // Handle payment completion when clicked
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                                    >
                                        Payment Done
                                    </button>
                                    <button
                                        onClick={closePopup} // Close the QR code popup
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Counter Payment Option */}
            {paymentOption === "Counter" && (
                <div className="mt-4 text-sm text-red-600">
                    <p className="font-bold">Reminder:</p>
                    <p>Your room number is not confirmed.</p>
                    <p>Please make the payment at the counter to confirm your booking.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentOptions;
