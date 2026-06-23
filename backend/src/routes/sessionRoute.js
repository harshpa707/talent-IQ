import express from "express";
import { protectRoute } from "../../middleware/protectroute.js";
import {
  createSession,
  endSessions,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSessions,
} from "../../controllers/sessionControllers.js";

const router = express.Router();

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);
router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSessions);
router.post("/:id/end", protectRoute, endSessions);

export default router;