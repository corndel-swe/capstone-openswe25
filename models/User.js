import db from '../db/index.js'

class User {   
    static async getAllUsers(){

    const results = await db.raw(`SELECT id, username, imageURL FROM user`)
    return results
    }
}

  

export default User