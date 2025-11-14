import db from '../db/index.js'

class User {   
    static async getAllUsers(){

    const results = await db.raw(`SELECT username, imageURL FROM user`)
    return results
    }

    static async createNewUser({username, fullname, email, password_hash, imageURL}){

        const query = `
        INSERT INTO user
        (username, fullname, email, password_hash, imageURL)
        VALUES (?, ?, ?, ?, ?)
        RETURNING*;
        `
        const results = await db.raw(query, [username, fullname, email, password_hash, imageURL])
        return results[0]
    }
}

  

export default User