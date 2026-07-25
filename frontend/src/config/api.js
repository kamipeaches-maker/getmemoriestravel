export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth
  REGISTER_CUSTOMER: '/api/auth/register/customer',
  REGISTER_CONTRACTOR: '/api/auth/register/contractor',
  LOGIN: '/api/auth/login',
  
  // Submissions
  CREATE_SUBMISSION: '/api/submissions',
  GET_SUBMISSIONS: '/api/submissions',
  GET_SUBMISSION: (id) => `/api/submissions/${id}`,
  GENERATE_TRAVEL_PLAN: (id) => `/api/submissions/${id}/travel-plan`,
  
  // Bookings
  CREATE_BOOKING: '/api/bookings',
  GET_CUSTOMER_BOOKINGS: '/api/bookings/customer/list',
  GET_CONTRACTOR_BOOKINGS: '/api/bookings/contractor/list',
  ACCEPT_BOOKING: (id) => `/api/bookings/${id}/accept`,
  UPDATE_BOOKING_STATUS: (id) => `/api/bookings/${id}/status`,
  
  // Contractors
  GET_CONTRACTORS: '/api/contractors',
  GET_CONTRACTOR: (id) => `/api/contractors/${id}`,
  UPDATE_CONTRACTOR_PROFILE: '/api/contractors/profile',
  UPDATE_AVAILABILITY: '/api/contractors/availability',
  
  // Messages
  SEND_MESSAGE: '/api/messages',
  GET_MESSAGES: '/api/messages',
  GET_CONVERSATION: (id) => `/api/messages/conversation/${id}`,
  MARK_MESSAGE_READ: (id) => `/api/messages/${id}/read`,
  
  // Reviews
  CREATE_REVIEW: '/api/reviews',
  GET_USER_REVIEWS: (id) => `/api/reviews/user/${id}`,
  GET_GIVEN_REVIEWS: '/api/reviews/given'
};
