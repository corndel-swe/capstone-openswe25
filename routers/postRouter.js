import { Router } from "express";
import { getPostById, getAllPosts, postNewPost, postLike } from "../controllers/postControllers.js";

const postRouter = new Router()

postRouter.get('/:id', getPostById)
postRouter.get('/', getAllPosts)
postRouter.post('/', postNewPost)
postRouter.post('/:id/like', postLike)

export default postRouter

