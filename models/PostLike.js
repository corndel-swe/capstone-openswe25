import db from "../db/index.js"
class PostLike {
    static async addLike(postId, userId) {
        const query = `
        INSERT INTO post_like (post_id, user_id)
        VALUES ( ? , ? )`
        const result = await db.raw(query, [postId, userId])
        return result
    }
}
export default PostLike