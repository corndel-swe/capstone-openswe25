import { Router } from "express";
import { getAllCommentsForPost, postNewComment } from "../controllers/commentControllers.js";
import { redirectIfLoggedIn, requireAuth } from "../controllers/auth.js";

const commentRouter = new Router()

commentRouter.get('/:id', requireAuth, getAllCommentsForPost)
commentRouter.post('/:id', requireAuth, postNewComment)

export default commentRouter