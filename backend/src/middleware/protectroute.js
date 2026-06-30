import { getAuth } from "@clerk/express";
import User from "../models/Users.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({
        massage: "Unauthorized - invalid token",
      });
    }

    // Find user in DB by Clerk ID
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        massage: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({
      massage: "Internal Server Error",
    });
  }
};
