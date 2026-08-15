import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/Users.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({
        message: "Unauthorized - invalid token",
      });
    }

    // Clerk se complete user details lao
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // MongoDB me user check karo
    let existingUser = await User.findOne({ clerkId });

    // Agar user DB me nahi hai to create karo
    if (!existingUser) {
      existingUser = await User.create({
        clerkId: clerkUser.id,
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        email: clerkUser.emailAddresses[0]?.emailAddress,
        // profileImage: clerkUser.imageUrl,
      });
    }

    // Request ke andar user save karo
    req.user = existingUser;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
