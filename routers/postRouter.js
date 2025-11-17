import { Router } from "express";
import { getPostById, getAllPosts, postNewPost } from "../controllers/postControllers.js";

const postRouter = new Router()

postRouter.get('/:id', getPostById)
postRouter.get('/', getAllPosts)
postRouter.post('/', postNewPost)

export default postRouter

