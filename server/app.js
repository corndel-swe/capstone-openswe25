import express from 'express';
import postRouter from '../routers/postRouter.js'
import userRouter from '../routers/userRouter.js'
import commentRouter from '../routers/commentRouter.js'
import { handleErrors } from '../errors/errorHandling.js';
import session from 'express-session';
import 'dotenv/config'

const secretPassword = process.env.SECRET

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({limit: '50mb', extended: true }))
app.use(session({
    secret: secretPassword,
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs')

app.use('/post', postRouter)
app.use('/user', userRouter)
app.use('/comment', commentRouter)

app.use(handleErrors)

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


app.use((req, res, next) => {
    res.sendStatus(404)
});

export default app
