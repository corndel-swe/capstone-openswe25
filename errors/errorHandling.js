import AppError from "../models/AppError.js"


export const handleErrors = (err, req, res, next) => {
    console.log(err)
    if (err instanceof AppError) {
        res.status(err.code).send({ msg: err.message })
    } else if (err.errno === 19) {
        res.status(400).send({ msg: 'Email or username is already associated with an account.' })
    }
    else {
        res.status(500).send({ msg: 'Something went wrong' })
    }
}

