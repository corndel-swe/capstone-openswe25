import db from '../db/index.js'

class User {
    static async getAllUsers(){
        const results = await db.raw(`SELECT username, imageURL FROM user`)
        return results
    }
}

User.getAllUsers();

export default User