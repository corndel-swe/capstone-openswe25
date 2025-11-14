import { Router } from "express";
import { getAllPosts } from "../controllers/postControllers.js";

const productRouter = Router()

productRouter.get('/', getAllPosts)

export default productRouter