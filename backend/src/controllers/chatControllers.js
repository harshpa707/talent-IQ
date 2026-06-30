import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req,res){
  try {

    const token = chatClient.createToken(req.user._id)

    res.status(200).json({
      token,
      userId:req.user.clerkId,
      userName:req.user.name,
      userImage:req.user.image
    })
  } catch (error) {
    console.log("Error in getStream controller:", error.massage);
    res.status(500).json({massage:" Internal Server Error"})
  }
}