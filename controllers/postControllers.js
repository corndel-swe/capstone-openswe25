import Post from "../models/Post.js"
import AppError from "../models/AppError.js"
import User from "../models/User.js"
import PostCategory from "../models/PostCategory.js"
import Category from "../models/Category.js"
import PostLike from "../models/PostLike.js"

export const getPostById = async (req, res, next) => {
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
        next(err)
    }
}

export const getAllPosts = async (req, res) => {
    const posts = await Post.findAll();
    res.status(200).send(posts)
};

export const postNewPost = async (req, res, next) => {

    const { title, content, id, imageURL, categories } = req.body

    try {

        if (isNaN(Number(id))) {
            throw new AppError('User id must be a number', 400)
        }

        if (!title || !content || !id || !imageURL || !categories.length) {
            throw new AppError('Title, content, user id, imageurl and category(s) must all be provided', 400)
        }

        for (let category of categories) {
            if (isNaN(Number(category))) {
                throw new AppError('Category id must be a number', 400)
            }
        }

        const user = await User.getUserById(id)
        const allCategories = await Category.findAllCategories()
        const validCategories = allCategories.map((category) => category.id)

        if (!user.length) {
            throw new AppError('User does not exist', 404)
        }

        if (!categories.every(category => validCategories.includes(category))) {
            throw new AppError('Category does not exist', 404)
        }

        const newPost = await Post.addPost(title, content, id, imageURL)
        const categoriesAdded = await PostCategory.addCategoriesToPost(categories, newPost.id)

        res.status(201).send({ newPost, categoriesAdded })
    }
    catch (err) {
        next(err)
    }
}

export const postLike = async (req, res, next) => {
    const { user } = req.body
    const { id } = req.params

    try {

        if (!user.id) {
            throw new AppError('User ID must be provided', 400)
        }

        if (isNaN(Number(user.id)) || isNaN(Number(id))) {
            throw new AppError('User ID and Post ID must both be valid numbers', 400)
        }

        const validUser = await User.getUserById(user.id)

        if (!validUser.length) {
            throw new AppError('User does not exist', 404)
        }

        const validPost = await Post.findPostById(id)

        if (!validPost) {
            throw new AppError('Post does not exist', 404)
        }
        await PostLike.addLike(id, user.id)
        res.status(201).send({ msg: 'Post successfully liked' })
    }
    catch (err) {
        next(err)
    }

}
