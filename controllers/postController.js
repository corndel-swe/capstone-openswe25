import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
    const posts = await Post.findAll();
    res.status(200).send(posts)    
};