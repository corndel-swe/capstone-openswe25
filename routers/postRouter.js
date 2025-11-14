import { Router } from "express";
import { getPostById, getAllPosts } from "../controllers/postControllers.js";

const postRouter = new Router()

postRouter.get('/:id', getPostById)
postRouter.get('/', getAllPosts)

export default postRouter

