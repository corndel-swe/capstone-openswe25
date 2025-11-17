import db from "../db/index.js"

class Comment {
    static async findAllById(id) {
        const results = await db.raw(`
            SELECT comment.content, comment.created_at, user.username FROM comment
            INNER JOIN user ON comment.user_id = user.id
            WHERE user_id = ?;`, [id])
        return results
    }
    static async addComment(postId, userId, content) {
        const query = `
        INSERT INTO comment (post_id, user_id, content) 
        VALUES (?, ?, ?)
        RETURNING *`
        const results = await db.raw(query, [postId, userId, content])
        return results
    }
}

export default Comment