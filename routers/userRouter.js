import { Router } from "express";
import { getUsers, createUser, loginUser, getRegisterPage, getLoginPage, logoutUser} from "../controllers/userController.js";
import { redirectIfLoggedIn, requireAuth} from "../controllers/auth.js";

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.get('/register', redirectIfLoggedIn, getRegisterPage)
userRouter.get('/login', redirectIfLoggedIn, getLoginPage)
userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout',requireAuth, logoutUser)

export default userRouter