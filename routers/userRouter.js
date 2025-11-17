import { Router } from "express";
import { getUsers, createUser, loginUser, getRegisterPage} from "../controllers/userController.js";

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.get('/register', getRegisterPage)
userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)

export default userRouter