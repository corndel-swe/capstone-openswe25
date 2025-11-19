import { Router } from "express";
import { getAllCategories } from "../controllers/categoryControllers.js";

const categoryRouter = new Router()

categoryRouter.get('/', getAllCategories)


export default categoryRouter