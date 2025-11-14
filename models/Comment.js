import db from "../db/index.js"

class Comment {
    static async findAllById(id) {
        const results = await db.raw(`
            SELECT comment.content, comment.created_at, user.username FROM comment
            INNER JOIN user ON comment.user_id = user.id
            WHERE user_id = ?;`, [id])
        return results
    }
}

export default Comment