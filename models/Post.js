import db from '../db/index.js'
class Post {
    static async findPostById(id) {
        const query = `
            SELECT post.title, user.username, post.created_at, COUNT(post_like.post_id) AS total_likes, post.image_url, post.content FROM post
            INNER JOIN user ON post.user_id = user.id
            INNER JOIN post_like ON post.id = post_like.post_id
            WHERE post.id = ?
            GROUP BY post.id;
            `
        const results = await db.raw(query, [id])
        return results[0]
    }
    static async findAll(sortBy = 'DESC', userId) {
        const params = [];
        let whereClause = '';
        if (userId) {
            whereClause = 'WHERE user.id = ?';
            params.push(userId);
        }
        const query = `
        SELECT 
            post.image_url, 
            post.title, 
            user.username, 
            COUNT(post_like.user_id) AS total_likes, 
            post.created_at
        FROM post
        INNER JOIN user ON post.user_id = user.id
        LEFT JOIN post_like ON post.id = post_like.post_id
        ${whereClause}
        GROUP BY post.id
        ORDER BY post.created_at ${sortBy}
        `;
        const rows = await db.raw(query, params);
        return rows;
    }
}

export default Post