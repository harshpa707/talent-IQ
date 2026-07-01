import axiosInstance from "../lib/axios.js";

export const sessionApi = {
  createSession: (data) => axiosInstance.post("/session", data),

  getActiveSessions: () => axiosInstance.get("/session/active"),

  getMyRecentSessions: () => axiosInstance.get("/session/my-recent"),

  getSessionById: (id) => axiosInstance.get(`/session/${id}`),

  joinSession: (id) => axiosInstance.post(`/session/${id}/join`),

  endSession: (id) => axiosInstance.post(`/session/${id}/end`),
  getStreamToken: async () => {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
  },
};
