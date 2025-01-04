export const validateForm = (bookingDetails, setErrors) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
  
    // Check for required fields (excluding roomPreference)
    Object.keys(bookingDetails).forEach((key) => {
      if (!bookingDetails[key] && key !== "roomPreference") {
        errors[key] = "This field is required.";
      }
    });
  
    // Validate email
    if (bookingDetails.email && !emailRegex.test(bookingDetails.email)) {
      errors.email = "Please enter a valid email address.";
    }
  
    // Validate phone number
    if (bookingDetails.phone && !phoneRegex.test(bookingDetails.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }
  
    // Validate check-in and check-out time
    if (bookingDetails.checkInTime && bookingDetails.checkOutTime) {
      const checkInDate = new Date(`1970-01-01T${bookingDetails.checkInTime}:00`);
      const checkOutDate = new Date(`1970-01-01T${bookingDetails.checkOutTime}:00`);
  
      if (checkInDate >= checkOutDate) {
        errors.checkOutTime = "Check-out time must be later than check-in time.";
      }
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  export const convertToIndianDate = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);
    const offsetInMinutes = 330; // IST offset
    const istDate = new Date(localDate.getTime() + offsetInMinutes * 60000);
  
    const dayFormatted = String(istDate.getDate()).padStart(2, "0");
    const monthFormatted = String(istDate.getMonth() + 1).padStart(2, "0");
    const yearFormatted = String(istDate.getFullYear()).slice(2); // Get last two digits of year
    return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
  };
  