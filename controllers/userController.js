import User from "../models/User.js"
import AppError from "../models/AppError.js"
import bcrypt from "bcrypt"
import fs from "fs";
import path from "path";

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

export const getRegisterPage = async (req, res, next) => {

    try {

        res.render('register')
    } catch (err) {
        next(err)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { username, fullname, email, password, confirm_password, imageBase64 } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;



        if (!username || !fullname || !email || !password || !confirm_password) {
            throw new AppError('Missing required fields: Username, full name, email address, password and an image must all be provided', 400)
        }

        if (!emailRegex.test(email)) {
            throw new AppError('Invalid email format', 400);
        }


        if (!passwordRegex.test(password)) {
            throw new AppError('Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 symbol.', 400);
        }

        if (password !== confirm_password) {
            throw new AppError('Passwords do not match. Try again.', 400)
        }

        if (!imageBase64) {
            throw new AppError("Image is required", 400);
        }


        const base64Data = imageBase64.split(";base64,").pop();


        const filename = `${Date.now()}.png`;
        const filePath = path.join("public", "uploads", filename);


        fs.writeFileSync(filePath, base64Data, { encoding: "base64" });


        const imageURL = `/uploads/${filename}`;


        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds)
        const newUser = await User.createNewUser({ username, fullname, email, password_hash, imageURL })
        res.status(201).send(newUser)

    } catch (err) {
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            throw new AppError('Email and password are required', 400)
        }
        const user = await User.getUserByEmail(email)

        if (!user || user.length === 0) {
            throw new AppError('Email address provided is not linked to an account. Use an existing email address or register a new account.', 401)
        }

        const passwordsMatch = await bcrypt.compare(password, user.password_hash)

        if (!passwordsMatch) {
            throw new AppError('Incorrect password. Try again.', 401)
        }

        res.status(200).send(user)


    } catch (err) {
        next(err)
    }
}
