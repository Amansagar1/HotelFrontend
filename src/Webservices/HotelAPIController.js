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


export const getAllRoomsDetails = () => {
  const url = EndPoints.GET_ROOMSDETAILS();
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

export const getRoomDetailsById = async (id) => {
  try {
    console.log("Room ID received:", id); // Log the room ID for debugging

    let response;

    if (id && id.length === 24) { // MongoDB ObjectId format (24 characters)
      // Correct API endpoint usage
      response = await axios.get(EndPoints.GET_DELUXE_ROOMS(id));
      response = await axios.get(EndPoints.GET_SUPER_DELUXE_ROOMS(id));
      response = await axios.get(EndPoints.GET_FAMILY_ROOMS(id));
    } else {
      console.error("Invalid room ID:", id); // Log invalid ID for debugging
      throw new Error("Invalid room ID");
    }

    return response.data; // Return the room details
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error; // Propagate the error if something goes wrong
  }
};



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
      if (!response.ok) {
        // Log the response body to help debug issues
        return response.text().then((text) => {
          throw new Error(`Booking failed: ${response.statusText}. Response body: ${text}`);
        });
      }
      return response.json(); // Parse the response as JSON if OK
    })
    .then((data) => {
      console.log("Booking successful", data);
      return data; // Return the response data
    })
    .catch((error) => {
      console.error("Error during booking:", error.message);
      throw error; // Rethrow error so it can be handled by the caller
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
      available: false,
    };

    // Perform the PUT request to update the deluxe room
    const response = await axios.put(EndPoints.PUT_DELUXE_ROOM(id), updatedRoomData);

    console.log("Updated Room Data:", response.data);
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
      available: false,
    };

    // Perform the PUT request to update the super deluxe room
    const response = await axios.put(EndPoints.PUT_SUPERDELUXE_ROOM(id), updatedRoomData);

    console.log("Updated Room Data:", response.data);
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
      available: false,
    };

    // Perform the PUT request to update the family room
    const response = await axios.put(EndPoints.PUT_FAMILY_ROOM(id), updatedRoomData);

    console.log("Updated Room Data:", response.data);
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