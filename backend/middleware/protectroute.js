
import { getAuth } from "@clerk/express";
import User from "../src/models/Users.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({
        msg: "Unauthorized - invalid token",
      });
    }

    // Find user in DB by Clerk ID
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};