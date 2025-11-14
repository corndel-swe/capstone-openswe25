import AppError from "../models/AppError.js"
import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
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
        console.log(err)
        if (err instanceof AppError) {
            res.status(err.code).send({ msg: err.message })
        } else {
            res.status(500).send({ msg: 'Something went wrong' })
        }
    }
}