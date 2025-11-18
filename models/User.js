import db from '../db/index.js'

class User {
    static async getAllUsers() {
        const results = await db.raw(`SELECT id, username, imageURL FROM user`)
        return results
    }

    static async getUserById(id) {
        const results = await db.raw(`
            SELECT username FROM user
            WHERE id = ?`, [id])
        return results
    }

    static async getUserByEmail(email){
        const results = await db.raw(`
            SELECT * from user
            WHERE email = ?`, [email])
        return results[0]
    }

    static async createNewUser({ username, fullname, email, password_hash, imageURL }) {

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