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

    const clerkUser = await clerkClient.users.getUser(clerkId);

    let existingUser = await User.findOne({ clerkId });

    // Agar clerkId se user nahi mila
    if (!existingUser) {
      // Email se existing user check karo
      const email = clerkUser.emailAddresses[0]?.emailAddress;

      existingUser = await User.findOne({ email });

      if (existingUser) {
        // Existing account ko current Clerk ID se link karo
        existingUser.clerkId = clerkUser.id;
        existingUser.name =
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();
        existingUser.profileImage = clerkUser.imageUrl;

        await existingUser.save();
      } else {
        // Completely new user
        existingUser = await User.create({
          clerkId: clerkUser.id,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          email,
          profileImage: clerkUser.imageUrl,
        });
      }
    }

    req.user = existingUser;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
