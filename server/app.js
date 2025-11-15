import express from 'express';
import postRouter from '../routers/postRouter.js'
import userRouter from '../routers/userRouter.js'
import commentRouter from '../routers/commentRouter.js'

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)

app.use((req, res, next) => {
    res.sendStatus(404)
});

export default app
