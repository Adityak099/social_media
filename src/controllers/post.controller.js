import { asyncHandler } from "../utils/asyncHandler";
import { Post } from "../models/post.model.js";
const createPost = asyncHandler(async (req, res) => {
  try {
    const { title, caption } = req.body.trim();
    if ([title, caption].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    const userId = req.user._id;
    const createdPost = await Post.create({
      title,
      image,
      owner: userId,
    });
    if (!createdPost) {
      res.status(400).json({ message: "Error creating post" });
    }
    return res.status(201).json({ message: "Post created", data: createdPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
