import axios from "axios";
import EndPoints from "./APIEndpoints";


export const getRoomsCategory = () => {
  return axios
    .get(EndPoints.GET_ROOMS())
    .then((response) => {
      console.log("API Response:", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("Error fetching rooms data:", error);
      return { result: null };
    });
};

// Get Deluxe Room data
export const getDeluxeRoom = () => {
  return axios
    .get(EndPoints.GET_DELUXE_ROOMS())
    .then((response) => {
      console.log("Deluxe Room API Response:", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("Error fetching Deluxe Room data:", error);
      return { result: null };
    });
};


export const getDeluxeRoomById = async (id) => {
  try {
    const response = await axios.get(EndPoints.GET_DELUXE_ROOMSBYNUMBER(id));
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching Deluxe room details:", error);
    throw error;
  }
};


export const getSuperDeluxeRoomById = async (id) => {
  try {
    const response = await axios.get(EndPoints.GET_SUPERDELUXE_ROOMSBYNUMBER(id));
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching Super Deluxe room details:", error);
    throw error;
  }
};


export const getFamilyRoomById = async (id) => {
  try {
    const response = await axios.get(EndPoints.GET_FAMILY_ROOMSBYNUMBER(id));
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching Family room details:", error);
    throw error;
  }
};


// Get Super Deluxe Room data
export const getSuperDeluxeRoom = () => {
  return axios
    .get(EndPoints.GET_SUPER_DELUXE_ROOMS())
    .then((response) => {
      console.log("Super Deluxe Room API Response:", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("Error fetching Super Deluxe Room data:", error);
      return { result: null };
    });
};

// Get Family Deluxe Room data
export const getFamilyDeluxeRoom = () => {
  return axios
    .get(EndPoints.GET_FAMILY_ROOMS())
    .then((response) => {
      console.log("Family Deluxe Room API Response:", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("Error fetching Family Deluxe Room data:", error);
      return { result: null };
    });
};


// export const getAllRoomsDetails = () => {
//   const url = EndPoints.GET_ROOMSDETAILS();
//   console.log("Requesting URL:", url);

//   return axios
//     .get(url)
//     .then((response) => {
//       console.log("API Response:", response.data);
//       return { result: response.data };
//     })
//     .catch((error) => {
//       console.error("Error details:", {
//         message: error.message,
//         code: error.code,
//         config: error.config,
//         response: error.response,
//       });
//       return { result: null };
//     });
// };

// export const getRoomDetailsById = async (id) => {
//   try {
//     console.log("Room ID received:", id); // Log the room ID for debugging

//     let response;

//     if (id && id.length === 24) { // MongoDB ObjectId format (24 characters)
//       // Correct API endpoint usage
//       response = await axios.get(EndPoints.GET_DELUXE_ROOMS(id));
//       response = await axios.get(EndPoints.GET_SUPER_DELUXE_ROOMS(id));
//       response = await axios.get(EndPoints.GET_FAMILY_ROOMS(id));
//     } else {
//       console.error("Invalid room ID:", id); // Log invalid ID for debugging
//       throw new Error("Invalid room ID");
//     }

//     return response.data; // Return the room details
//   } catch (error) {
//     console.error("Error fetching room details:", error);
//     throw error; // Propagate the error if something goes wrong
//   }
// };



// export const getRoomDetailsById = (id) => {
//   return axios
//     .get(`${EndPoints.GET_ROOMSDETAILS()}/${id}`) // Assuming the endpoint allows fetching by ID
//     .then((response) => {
//       console.log("API Response:", response.data); // Check response data
//       return { result: response.data }; // Ensure the data structure is correct
//     })
//     .catch((error) => {
//       console.error("Error fetching room data:", error);
//       return { result: null };
//     });
// };


// ManagementAPIController.js
// Assuming you have a Webservices/ManagementAPIController.js file

// export const roomBooking = async (bookingDetails) => {
//   try {
//     const response = await fetch(EndPoints.BOOKING_ROOMS(), { 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(bookingDetails),
//     });

//     if (!response.ok) {
//       throw new Error('Booking failed');
//     }

//     const result = await response.json(); // Assuming the backend returns JSON response
//     return result;
//   } catch (error) {
//     console.error('Error in roomBooking:', error);
//     throw error; // Rethrow error so it can be caught in handleSubmit
//   }
// };


export const postBookingRoom = (bookingData) => {
  return fetch(EndPoints.POST_BOOKING_ROOMS(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  })
    .then((response) => {
      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        return response.text().then((text) => {
          // Log and throw detailed error if response is not OK
          const errorMessage = `Booking failed: ${response.statusText}. Response body: ${text}`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        });
      }
      return response.json(); // Proceed with parsing the response as JSON
    })
    .then((data) => {
      console.log("Booking successful", data);
      return data; // Return the parsed response data
    })
    .catch((error) => {
      console.error("Error during booking:", error.message);
      throw error; // Rethrow error to be handled by the caller
    });
};



export const createRoom = async (roomData) => {
  try {
    const response = await axios.post(EndPoints.POST_ROOMS(), roomData);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

// Function to get a room by ID (GET /api/rooms/:id)
export const getRoomById = async (_id) => {
  try {
    const response = await axios.get(EndPoints.GET_ROOMID(_id));
    return response.data;
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error;
  }
};


// api/amenities.js
export async function getAmenities() {
  try {
    const response = await fetch(EndPoints.GET_AMINITIES(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching amenities:', error);
    throw error;
  }
}

//------

// Export function for creating a deluxe room
export async function PutDeluxeRoom(id, deluxeRoomData) {
  try {
    const updatedRoomData = {
      ...deluxeRoomData,
      available: false,  // Mark room as unavailable
    };

    // Perform the PUT request to update the deluxe room
    const response = await axios.put(EndPoints.PUT_DELUXE_ROOM(id), updatedRoomData);

    console.log("Updated Deluxe Room Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating deluxe room:", error);
    throw error;  // Rethrow error for further handling
  }
}


export async function PutSuperDeluxeRoom(id, deluxeRoomData) {
  try {
    const updatedRoomData = {
      ...deluxeRoomData,
      available: false,  // Mark room as unavailable
    };

    // Perform the PUT request to update the super deluxe room
    const response = await axios.put(EndPoints.PUT_SUPERDELUXE_ROOM(id), updatedRoomData);

    console.log("Updated Super Deluxe Room Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating super deluxe room:", error);
    throw error;  // Rethrow error for further handling
  }
}



export async function PutFamilyRoom(id, deluxeRoomData) {
  try {
    const updatedRoomData = {
      ...deluxeRoomData,
      available: false,  // Mark room as unavailable
    };

    // Perform the PUT request to update the family room
    const response = await axios.put(EndPoints.PUT_FAMILY_ROOM(id), updatedRoomData);

    console.log("Updated Family Room Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating family room:", error);
    throw error;  // Rethrow error for further handling
  }
}



export const getAllBookingRooms = () => {
  const url = EndPoints.GET_ALL_BOOKING_ROOMS();
  console.log("Requesting URL:", url);

  return axios
    .get(url)
    .then((response) => {
      console.log("API Response:", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response,
      });
      return { result: null };
    });
};


//---login--//
export const loginUser = (loginData) => {
  return fetch(EndPoints.LOGIN_USER(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject('Failed to login');
      }
      return response.json();
    })
    .then((data) => {
      // Store token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
      console.log('Login Successful:', data);
      return data.user; // Return user data
    })
    .catch((error) => {
      console.error('Login Error:', error);
      throw error;
    });
};


export function registerUser(userData) {
  return fetch(EndPoints.REGISTER_USER(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      return response.json(); // Return the response data as JSON
    })
    .then((data) => {
      console.log('User registered successfully', data);
      return data; // Return the success data
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      throw error; // Throw error to be handled by the caller
    });
}


// Function to send booking emails
export const sendBookingEmails = async (bookingDetails) => {
  const apiUrl = EndPoints.MAIL_URL; // Ensure EndPoints.MAIL_URL is defined properly
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails), // Removed extra nesting around `bookingDetails`
    });

    // Parse the response
    const data = await response.json();

    if (!response.ok) {
      // Log the error response
      console.error("Failed to send emails:", data);
      throw new Error(data.message || "Error sending emails");
    }

    console.log("Emails sent successfully:", data);
    return data;
  } catch (error) {
    // Catch and log any other errors
    console.error("Error in sendBookingEmails:", error);
    throw error;
  }
};


//-get all rooms
export const getAllRooms = () => {
  return axios
    .get(EndPoints.GET_ALL_ROOMS())
    .then((response) => {
      console.log("getAllRooms API Response:", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("Error fetching getAllRooms Room data:", error);
      return { result: null };
    });
};


//-get all rooms check availability


export const fetchAvailableRooms = async (checkIn, checkOut, roomType) => {
  try {
    const response = await axios.get('/api/allrooms/availability', {
      params: {
        checkIn: checkIn,
        checkOut: checkOut,
        roomType: roomType,
      },
    });
    return response.data.availableRooms;
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    return [];
  }
};
//Footer

// Function to get the footer details
export const getFooter = async () => {
  try {
    const response = await axios.get(EndPoints.GET_FOOTER());
    console.log("getFooter API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching getFooter data:", error);
    throw error; 
  }
};
export const getAmenitiesPage = async () => {
  try {
    const response = await axios.get(EndPoints.GET_AMENITIES_PAGE());
    console.log("getAmenitiesPage API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching getAmenitiesPage data:", error);
    throw error; 
  }
};

export const getAboutUs = async () => {
  try {
    const response = await axios.get(EndPoints.GET_ABOUT_US());
    console.log("getAboutUs API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching getAboutUs data:", error);
    throw error; 
  }
};