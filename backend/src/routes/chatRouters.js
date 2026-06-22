import express from "express"
import { getStreamToken } from "../../controllers/chatControllers.js";
import { protectRoute } from "../../middleware/protectroute.js";
const router = express.Router();
router.get("/token",protectRoute,getStreamToken)


export default router