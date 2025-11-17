import express from 'express';
import postRouter from '../routers/postRouter.js'
import userRouter from '../routers/userRouter.js'
import commentRouter from '../routers/commentRouter.js'
import { handleErrors } from '../errors/errorHandling.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/post', postRouter)
app.use('/user', userRouter)
app.use('/comment', commentRouter)

app.use(handleErrors)

export default app
