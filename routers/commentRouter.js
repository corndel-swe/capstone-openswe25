import { Router } from "express";
import { getAllCommentsForPost , postNewComment} from "../controllers/commentControllers.js";

const commentRouter = new Router()

commentRouter.get('/:id', getAllCommentsForPost)
commentRouter.post('/:id', postNewComment)

export default commentRouter