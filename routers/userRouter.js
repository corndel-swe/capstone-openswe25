import { Router } from "express";
import { getUsers, createUser, loginUser, getRegisterPage, getLoginPage} from "../controllers/userController.js";

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.get('/register', getRegisterPage)
userRouter.get('/login', getLoginPage)
userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)

export default userRouter