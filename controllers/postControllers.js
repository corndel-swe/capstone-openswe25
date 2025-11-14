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
        const { sort_by } = req.query
        console.log(sort_by)
        // if(sort_by) {
        //     if(sort_by !== 'ASC' && sort_by !== 'DESC'){
        //         throw new AppError('sort_by must be ASC or DESC', 400)
        //     }
        // }

        const validSortBys = ['ASC', 'DESC']

        if(sort_by && !validSortBys.includes(sort_by)){
             throw new AppError('sort_by must be ASC or DESC', 400)
        }

        const posts = await Post.findAll(sort_by);
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