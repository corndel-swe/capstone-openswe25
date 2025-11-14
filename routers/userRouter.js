import { Router } from "express";
import { getUsers, createUser} from "../controllers/userController.js";

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.post('/register', createUser)

export default userRouter