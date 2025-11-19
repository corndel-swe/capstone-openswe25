import Post from "../models/Post.js"
import AppError from "../models/AppError.js"
import User from "../models/User.js"
import PostCategory from "../models/PostCategory.js"
import Category from "../models/Category.js"
import PostLike from "../models/PostLike.js"
import imageWriteFile from "../utils/imageWriteFIle.js"
import Comment from "../models/Comment.js"
import formatCreatedAt from "../utils/formatCreatedAt.js"
import formatCategory from "../utils/formatCategory.js"
import timeSince from "../utils/timeSince.js"

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

        post.created_at = formatCreatedAt(post.created_at)

        const comments = await Comment.findAllById(id)
        comments.forEach((comment) => comment.created_at = timeSince(comment.created_at))

        res.render('singlePost.ejs', { post, comments })
    }
    catch (err) {
        next(err)
    }
}

export const getAllPosts = async (req, res, next) => {
    try {
        const { order_by, sort_by, user_id, category_id } = req.query
        // ORDER_BY QUERY
        const validOrderBys = ['DATE', 'LIKE'];

        if (order_by && !validOrderBys.includes(order_by)) {
            throw new AppError('order_by must be DATE or LIKE', 400)
        };

        // SORT_BY QUERY
        const validSortBys = ['ASC', 'DESC'];

        if (sort_by && !validSortBys.includes(sort_by)) {
            throw new AppError('sort_by must be ASC or DESC', 400)
        };

        // USER_ID QUERY
        if (user_id && isNaN(Number(user_id))) {
            throw new AppError('user_id should be a number', 400);
        };

        const allUsers = await User.getAllUsers();
        const validUserIds = allUsers.map(user => user.id);
        const parsedUserId = parseInt(user_id);

        if (user_id && !validUserIds.includes(parsedUserId)) {
            throw new AppError('user_id does not exist', 400);
        };

        // CATEGORY_ID QUERY
        if (category_id && isNaN(Number(category_id))) {
            throw new AppError('category_id should be a number', 400);
        };

        const allCategories = await Category.findAllCategories();
        const validCategoryIds = allCategories.map(category => category.id);
        const parsedCategoryId = parseInt(category_id);

        if (category_id && !validCategoryIds.includes(parsedCategoryId)) {
            throw new AppError('category does not exist', 400);
        };

        const posts = await Post.findAll(order_by, sort_by, user_id, category_id);
        const categories = await Category.findAllCategories();

        for (const post of posts) {
            post.created_at = formatCreatedAt(post.created_at);
            post.category_name = formatCategory(post.category_name);
        }
        // res.status(200).send({ posts });
        res.render('index.ejs', { posts, categories });
    }
    catch (err) {
       next(err);
    };
};

export const postNewPost = async (req, res, next) => {

    const { title, content, id = 1, categories, imageURL } = req.body

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

        if (categories.length === 1) {
            if (!validCategories.includes(Number(categories[0]))) {

                throw new AppError('Category does not exist', 404)
            }
        } else if (!categories.every(category => validCategories.includes(Number(category)))) {
            throw new AppError('Category does not exist', 404)
        }

        const imageURLPath = imageWriteFile(imageURL)

        const newPost = await Post.addPost(title, content, id, imageURLPath)

        newPost.created_at = formatCreatedAt(newPost.created_at)

        await PostCategory.addCategoriesToPost(categories, newPost.id)

        const post = await Post.findPostById(newPost.id)

        post.created_at = formatCreatedAt(post.created_at)

        res.render(`singlePost.ejs`, { post, comments: [] })
    }
    catch (err) {
        next(err)
    }
}

export const postLike = async (req, res, next) => {
    const { userId } = req.body
    const { id } = req.params

    try {

        if (!userId) {
            throw new AppError('User ID must be provided', 400)
        }

        if (isNaN(Number(userId)) || isNaN(Number(id))) {
            throw new AppError('User ID and Post ID must both be valid numbers', 400)
        }

        const validUser = await User.getUserById(userId)

        if (!validUser.length) {
            throw new AppError('User does not exist', 404)
        }

        const validPost = await Post.findPostById(id)

        if (!validPost) {
            throw new AppError('Post does not exist', 404)
        }
        await PostLike.addLike(id, userId)

        const post = await Post.findPostById(id)

        post.created_at = formatCreatedAt(post.created_at)

        const comments = await Comment.findAllById(id)

        comments.forEach((comment) => comment.created_at = timeSince(comment.created_at))

        res.render('singlePost.ejs', { post, comments })
    }
    catch (err) {
        next(err)
    }

}

export const deletePost = async (req, res, next) => {
    const { id } = req.params

    try {

        if (isNaN(Number(id))) {
            throw new AppError('Post ID must be a number', 400)
        }

        const validPost = await Post.findPostById(id)

        if (!validPost) {
            throw new AppError('Post does not exist', 404)
        }

        await Post.deletePost(id)

        res.status(200).send({ msg: 'Post successfully deleted' })

    }

    catch (err) {
        next(err)

    }
}
export const getAddPostPage = async (req, res, next) => {
    try {
        const categories = await Category.findAllCategories();
        res.render('createPost.ejs', { categories });
    } catch (err) {
        next(err)
    }
}