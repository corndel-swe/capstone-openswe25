import User from "../models/User.js"

export const getUsers = async (req, res) =>{
    try{
        const user = await User.getAllUsers()

        if(!user || user){
            return res.status(404).send('Users not found.')
        }
        res.status(200).send(user)
    }catch(err){
        res.status(500).send('Server Error')
    }
}