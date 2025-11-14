import { Router } from "express";
import { getAllPosts } from "../controllers/postController.js";

const productRouter = Router()

productRouter.get('/', getAllPosts)

export default productRouter