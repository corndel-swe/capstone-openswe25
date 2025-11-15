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
        const { sort_by, user_id } = req.query
        // console.log(sort_by, user_id)
        // if(sort_by) {
        //     if(sort_by !== 'ASC' && sort_by !== 'DESC'){
        //         throw new AppError('sort_by must be ASC or DESC', 400)
        //     }
        // }
        // SORT_BY QUERY
        const validSortBys = ['ASC', 'DESC']

        if(sort_by && !validSortBys.includes(sort_by)){
             throw new AppError('sort_by must be ASC or DESC', 400)
        }

        // USER_ID QUERY
        // const allUsers = await Post.findAll()
        // console.log(allUsers)
        // const validUserIds = allUsers.map(user => user.id)
        // console.log(validUserIds)
        // if(!validUserIds.includes(user_id)){
        //     throw new AppError('user_id does not exist', 400)
        // }
        const userCondidtion = `WHERE user.id = ${user_id}`
        console.log(userCondidtion)
        const posts = await Post.findAll(sort_by, userCondidtion);
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