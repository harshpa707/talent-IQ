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
    // const user = await User.findOne({ clerkId });

    // if (!user) {
    //   return res.status(404).json({
    //     massage: "User not found",
    //   });
    // }

    // req.user = user;

    // next();
    const existingUser = await User.findOne({
      clerkId: clerkUser.id,
    });

    if (!existingUser) {
      await User.create({
        clerkId: clerkUser.id,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        email: clerkUser.emailAddresses[0].emailAddress,
        profileImage: clerkUser.imageUrl,
      });
    }
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({
      massage: "Internal Server Error",
    });
  }
};
