import { Router } from "express";
import { getAllCommentsForPost } from "../controllers/commentControllers.js";

const commentRouter = new Router()

commentRouter.get('/:id', getAllCommentsForPost)

export default commentRouter