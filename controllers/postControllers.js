import Post from "../models/Post.js"
import AppError from "../models/AppError.js"
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
    try {
        const posts = await Post.findAll();
        console.log(posts.length)
        if(posts.length === 0) {
            return res.status(200).send([])
        };
        res.status(200).send(posts)    
    }
    catch (err) {
        if(err instanceof AppError) {
            res.status(err.code).send({ msg:err.message })
        } else {
            res.status(500).send({ msg: 'Something went wrong' })
        }
    }
};