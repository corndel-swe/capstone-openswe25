import { Router } from "express";
import { getUsers, createUser, loginUser} from "../controllers/userController.js";

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)

export default userRouter