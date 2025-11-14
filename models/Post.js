import db from '../db/index.js'
class Post {
    static async findPostById(id) {
        const query = `
            SELECT post.title, user.username, post.created_at, COUNT(post_like.post_id) as total_likes, post.image_url, post.content FROM post
            INNER JOIN user ON post.user_id = user.id
            INNER JOIN post_like ON post.id = post_like.post_id
            WHERE post.id = ?
            GROUP BY post.id;
            `
        const results = await db.raw(query, [id])
        return results[0]
    }
}
export default Post