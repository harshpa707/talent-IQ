import axiosInstance from "../lib/axios.js";

export const sessionApi = {
  createSession: (data) => axiosInstance.post("/session", data),

  getActiveSessions: () => axiosInstance.get("/session/active"),

  getMyRecentSessions: () => axiosInstance.get("/session/my-recent"),

  getSessionById: (id) => axiosInstance.get(`/session/${id}`),

  joinSession: (id) => axiosInstance.post(`/session/${id}/join`),

  endSession: (id) => axiosInstance.post(`/session/${id}/end`),
  // Create Session
  // createSession: async (data) => {
  //   const response = await axiosInstance.post("/sessions", data);
  //   return response.data;
  // },

  // // Get Active Sessions
  // getActiveSessions: async () => {
  //   const response = await axiosInstance.get("/sessions/active");
  //   return response.data;
  // },

  // // Get My Recent Sessions
  // getMyRecentSessions: async () => {
  //   const response = await axiosInstance.get("/sessions/my-recent");
  //   return response.data;
  // },

  // // Get Session By Id
  // getSessionById: async (id) => {
  //   const response = await axiosInstance.get(`/sessions/${id}`);
  //   return response.data;
  // },

  // // Join Session
  // joinSession: async (id) => {
  //   const response = await axiosInstance.post(`/sessions/${id}/join`);
  //   return response.data;
  // },

  // End Session
  // endSession: async (id) => {
  //   const response = await axiosInstance.post(`/sessions/${id}/end`);
  //   return response.data;
  // },

  // Get Stream Token
  getStreamToken: async () => {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
  },
};
