import AppError from "../models/AppError.js"


export const handleErrors = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.code).send({ msg: err.message })
    } else {
        res.status(500).send({ msg: 'Something went wrong' })
    }
}

