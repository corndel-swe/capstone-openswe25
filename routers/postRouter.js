import { Router } from "express";
import { getPostById, getAllPosts, postNewPost, postLike, deletePost, getAddPostPage } from "../controllers/postControllers.js";
import { redirectIfLoggedIn, requireAuth } from "../controllers/auth.js";

const postRouter = new Router()

postRouter.get('/new', requireAuth, getAddPostPage)
postRouter.post('/:id/like', requireAuth, postLike)
postRouter.get('/:id', getPostById)
postRouter.get('/', getAllPosts)
postRouter.post('/new', requireAuth, postNewPost)
postRouter.delete('/:id', requireAuth, deletePost)

export default postRouter

