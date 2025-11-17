import AppError from "../models/AppError.js"
import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from "../models/User.js"

export const getAllCommentsForPost = async (req, res) => {

    const { id } = req.params

    try {

        if (isNaN(Number(id))) {
            throw new AppError('Post id should be a number')
        }

        const validPost = Post.findPostById(id)

        if (!validPost) {
            throw new AppError('Post does not exist')
        }

        const comments = await Comment.findAllById(id)

        res.status(200).send({ comments })
    }
    catch (err) {
        if (err instanceof AppError) {
            res.status(err.code).send({ msg: err.message })
        } else {
            res.status(500).send({ msg: 'Something went wrong' })
        }
    }
}

export const postNewComment = async (req, res) => {

    const { id } = req.params

    const { content, user } = req.body

    try {

        if (!content || !user.id) {
            throw new AppError('Content and User ID must both be provided', 400)
        }
    
        if (isNaN(Number(id))) {
            throw new AppError('Post id should be a number', 400)
        }
    
        const validPost = await Post.findPostById(id)
    
        if (!validPost) {
            throw new AppError('Post does not exist', 404)
        }
    
        if (isNaN(Number(user.id))) {
            throw new AppError('User id must be a number', 400)
        }
    
        const validUser = await User.getUserById(user.id)
    
        if (!validUser.length) {
            throw new AppError('User does not exist', 404)
        }
    
        const newComment = await Comment.addComment(id, user.id, content)
    
        res.status(201).send({newComment})
    }

    catch(err) {
         if (err instanceof AppError) {
            res.status(err.code).send({ msg: err.message })
        } else {
            res.status(500).send({ msg: 'Something went wrong' })
        }
    }
}