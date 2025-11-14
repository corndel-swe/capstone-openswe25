import express from 'express';
import postRouter from '../routers/postRouter.js'
import userRouter from '../routers/userRouter.js'
import commentRouter from '../routers/commentRouter.js'

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use('/post', postRouter)
app.use('/user', userRouter)
app.use('/comment', commentRouter)

export default app
