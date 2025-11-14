import Post from "../models/Post.js"
import AppError from "../models/AppError.js"
import User from "../models/User.js"
export const getPostById = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            throw new AppError('ID provided must be a valid number', 400)
        }
        const post = await Post.findPostById(id)
        if (!post) {
            throw new AppError('Post not found', 404)
        }
        res.status(200).send({ post })
    }
    catch (err) {
        if (err instanceof AppError) {
            res.status(err.code).send({ msg: err.message })
        } else {
            res.status(500).send({ msg: 'Something went wrong' })
        }
    }
}

export const getAllPosts = async (req, res) => {
    const posts = await Post.findAll();
    res.status(200).send(posts)
};

export const postNewPost = async (req, res) => {
    const { title, content, id, imageURL } = req.body
    try{
        const user = await User.getUserById(id)
        if(!user.length){
            throw new AppError('User does not exist', 404)
        }
        if(!title || !content || !id || !imageURL){
            throw new AppError('Title, content, user id and imageurl must all be provided', 400)
        }
        const newPost = await Post.addPost(title, content, id, imageURL)
        res.status(201).send({ newPost })
    }
    catch(err){
         if (err instanceof AppError) {
            res.status(err.code).send({ msg: err.message })
        } else {
            res.status(500).send({ msg: 'Something went wrong' })
        }
    }
}
