import User from "../models/User.js"
import AppError from "../models/AppError.js"

export const getUsers = async (req, res) =>{
try{
 const users = await User.getAllUsers()
    
 if(!users){
    throw new AppError('Users not found', 404)
}
res.status(200).send(users)

}catch(err){
    if(err instanceof AppError){
        res.status(err.code).send({msg: err.message})
    } else{

        res.status(500).send({msg: 'Something went wrong'})
    }


}
}
