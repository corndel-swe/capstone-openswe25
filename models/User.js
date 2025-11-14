import db from '../db/index.js'

class User {
    static async getAllUsers() {

        const results = await db.raw(`SELECT username, imageURL FROM user`)
        return results
    }
    static async getUserById(id) {
        const results = await db.raw(`
            SELECT username FROM user
            WHERE id = ?`, [id])
        return results
    }
}



export default User