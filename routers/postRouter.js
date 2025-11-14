import { Router } from "express";
import { getPostById } from "../controllers/postControllers.js";


const postRouter = new Router()

postRouter.get('/:id', getPostById)

export default postRouter