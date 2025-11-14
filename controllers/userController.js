import User from "../models/User.js"
import AppError from "../models/AppError.js"

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.getAllUsers()

        if (!users) {
            throw new AppError('Users not found', 404)
        }
        res.status(200).send(users)

    } catch (err) {
        next(err)

    }
}

export const createUser = async (req, res) =>{
    try{
        const {username, fullname, email, password_hash, imageURL} = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;




        if(!username || !fullname || !email || !password_hash || !imageURL){
            throw new AppError('Missing required fields: Username, full name, email address, password and an image must all be provided', 400)
        }

        if (!emailRegex.test(email)) {
            throw new AppError('Invalid email format', 400);
        }

    
        if (!passwordRegex.test(password_hash)) {
            throw new AppError('Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 symbol.', 400);
        }

        const newUser = await User.createNewUser({username, fullname, email, password_hash, imageURL})
        res.status(201).send(newUser)

    }catch(err){

        if(err instanceof AppError){
            res.status(err.code).send({msg: err.message})
        } else if(err.errno === 19){
            res.status(400).send({msg: 'Email or username is already associated with an account.' })
        }
        else {

            res.status(500).send({msg: 'Something went wrong'})
        }
}
}
