
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;



const EndPoints = {

    GET_ROOMS: () => BASE_URL + `/rooms`,

    GET_DELUXE_ROOMS: () => BASE_URL + `/deluxe-rooms`,

    GET_SUPER_DELUXE_ROOMS: () => BASE_URL + `/super-deluxe-rooms`,

    GET_FAMILY_ROOMS: () => BASE_URL + `/family-rooms`,

    GET_DELUXE_ROOMSBYNUMBER: (id) => `${BASE_URL}/api/deluxe-rooms/?id=${id}`,

    GET_SUPERDELUXE_ROOMSBYNUMBER: (id) => BASE_URL + `/super-deluxe-rooms/?id=${id}`,

    GET_FAMILY_ROOMSBYNUMBER: (id) => BASE_URL + `/family-rooms/?id=${id}`,

    GET_AMINITIES: () => BASE_URL + `/amenities`,

    GET_ALL_BOOKING_ROOMS: () => BASE_URL + `/bookings`,

    //-post function

    POST_BOOKING_ROOMS: () => BASE_URL + `/bookings`,

    PUT_FAMILY_ROOM: () => BASE_URL + `/family-rooms/${id}`,

    PUT_DELUXE_ROOM: (id) => BASE_URL + `/deluxe-rooms/${id}`,

    PUT_SUPERDELUXE_ROOM: () => BASE_URL + `/super-deluxe-rooms/${id}`,

    LOGIN_USER: () => BASE_URL + `/auth/login`,

    REGISTER_USER: () => BASE_URL + `/auth/register`,

   MAIL_URL: () => BASE_URL + `/email/send-booking-emails`,


};

Object.freeze(EndPoints);

export default EndPoints;



// GET_ROOMSDETAILS: () => BASE_URL + `/roomdetails`,

// BOOKING_ROOMS: () => BASE_URL + `/book`,

// POST_ROOMS: () => BASE_URL + `/rooms`,

// GET_ROOMID: (_id) => BASE_URL + `/rooms/:${_id} `,

// GET_AMINITIES: () => BASE_URL + `/amenities`,