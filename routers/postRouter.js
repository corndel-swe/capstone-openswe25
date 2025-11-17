import { Router } from "express";
import { getPostById, getAllPosts, postNewPost, postLike, deletePost, getAddPostPage } from "../controllers/postControllers.js";

const postRouter = new Router()

postRouter.get('/new', getAddPostPage)
postRouter.get('/:id', getPostById)
postRouter.get('/', getAllPosts)
postRouter.post('/new', postNewPost)
postRouter.post('/:id/like', postLike)
postRouter.delete('/:id', deletePost)

export default postRouter

