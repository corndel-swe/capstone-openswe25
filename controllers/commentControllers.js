import AppError from "../models/AppError.js"
import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from "../models/User.js"
import formatCreatedAt from "../utils/formatCreatedAt.js"
import timeSince from "../utils/timeSince.js"

export const getAllCommentsForPost = async (req, res, next) => {

    const { id } = req.params

    try {

        if (isNaN(Number(id))) {
            throw new AppError('Post id should be a number', 400)
        }

        const validPost = Post.findPostById(id)

        if (!validPost) {
            throw new AppError('Post does not exist', 404)
        }

        const comments = await Comment.findAllById(id)

        res.status(200).send({ comments })
    }
    catch (err) {
        next(err)
    }
}

export const postNewComment = async (req, res, next) => {

    const { id } = req.params

    const { content } = req.body

    const userId = req.session.user.id

    try {

        if (!content || !userId) {
            throw new AppError('Content and User ID must both be provided', 400)
        }

        if (isNaN(Number(id))) {
            throw new AppError('Post id should be a number', 400)
        }

        const validPost = await Post.findPostById(id)

        if (!validPost) {
            throw new AppError('Post does not exist', 404)
        }

        if (isNaN(Number(userId))) {
            throw new AppError('User id must be a number', 400)
        }

        const validUser = await User.getUserById(userId)

        if (!validUser.length) {
            throw new AppError('User does not exist', 404)
        }

        const newComment = await Comment.addComment(id, userId, content)
        const isFetch = req.headers["x-requested-with"] === "fetch";
        newComment[0].created_at = timeSince(newComment[0].created_at)
        newComment[0].username = validUser[0].username
        
        isFetch ? res.status(201).send({newComment : newComment[0]}) : res.redirect(`/post/${id}`)
    }

    catch (err) {
        const post = await Post.findPostById(id)

        post.created_at = formatCreatedAt(post.created_at)

        const comments = await Comment.findAllById(id)

        comments.forEach((comment) => comment.created_at = timeSince(comment.created_at))
        res.render('singlePost', { post, comments, error: { isCommentError: true, isLikeError: false, message: err.message, code: err.code } })
    }
}