import Post from "../models/Post.js"
import AppError from "../models/AppError.js"
import User from "../models/User.js"
import PostCategory from "../models/PostCategory.js"
import Category from "../models/Category.js"
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
    try {
        const { sort_by, user_id } = req.query
        // SORT_BY QUERY
        const validSortBys = ['ASC', 'DESC']

        if(sort_by && !validSortBys.includes(sort_by)){
             throw new AppError('sort_by must be ASC or DESC', 400)
        };

        // USER_ID QUERY
        const allUsers = await User.getAllUsers();
        const validUserIds = allUsers.map(user => user.id);
        const parsedUserId = parseInt(user_id);
        console.log(typeof(user_id))
        if(!validUserIds.includes(parsedUserId)){
            throw new AppError('user_id does not exist', 400)
        }
        // SQL injection
        // const userCondidtion = `WHERE user.id = ${user_id}`
        // console.log(userCondidtion)
        const posts = await Post.findAll(sort_by, user_id);
        if(!posts.length) {
            return res.status(200).send({posts})
    };
        res.status(200).send({posts})    
    }
    catch (err) {
        if(err instanceof AppError) {
            res.status(err.code).send({ msg:err.message })
        } else {
            res.status(500).send({ msg: 'Something went wrong' })
        }
    }
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
