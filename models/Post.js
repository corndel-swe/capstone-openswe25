import db from '../db/index.js'
class Post {
    static async findPostById(id) {
        const query = `
            SELECT post.id, post.title, user.username, post.user_id, post.created_at, post.image_url, post.content, 
            GROUP_CONCAT (DISTINCT category.name) AS category_name,
            GROUP_CONCAT (DISTINCT post_Category.category_id) AS category_id,
            (
                SELECT count(post_id) 
                FROM post_like
                WHERE post_like.post_id = post.id
            ) total_likes
            FROM post
            INNER JOIN user ON post.user_id = user.id
            INNER JOIN post_category ON post_category.post_id = post.id
            INNER JOIN category ON post_category.category_id = category.id
            WHERE post.id = ?
            GROUP BY post.id;
            `
        const results = await db.raw(query, [id])
        return results[0]
    }
    static async findAll(order_by = 'DATE', sortBy = 'DESC', userId, categoryId) {
        const params = [];
        let whereClause = '';
        let orderClause = 'ORDER BY post.created_at';

        if (userId) {
            whereClause = 'WHERE user.id = ?';
            params.push(userId);
        }
        if (categoryId) {
            if (whereClause) {
                whereClause += '\nAND post.id IN (';
            } else {
                whereClause = 'WHERE post.id IN (';
            }
            whereClause += `
            SELECT post_id 
            FROM post_category 
            WHERE category_id = ?)`;
            params.push(categoryId);
        }
        if (order_by === 'LIKE') {
            orderClause = 'ORDER BY total_likes'
        };

        const query = `
        SELECT 
            post.image_url,
            post.id,
            post.user_id,
            post.title,
            user.username,
            GROUP_CONCAT (DISTINCT post_category.category_id) AS category_id,
            GROUP_CONCAT (DISTINCT category.name) AS category_name,
            (
                SELECT count(post_id) 
                FROM post_like
                WHERE post_like.post_id = post.id
            ) total_likes,
            post.created_at
        FROM post
        INNER JOIN user ON post.user_id = user.id
        LEFT JOIN post_like ON post.id = post_like.post_id
        INNER JOIN post_category ON post.id = post_category.post_id
        INNER JOIN category ON post_category.category_id = category.id
        ${whereClause}
        GROUP BY post.id
        ${orderClause} ${sortBy}
        `;
        console.log(query)
        const rows = await db.raw(query, params);
        return rows;
    }
    static async addPost(title, content, id, imageURL) {
        const query = `
        INSERT INTO post (title, content, user_id, image_url)
        VALUES ( ? , ? , ? , ? )
        RETURNING *`
        const newPost = await db.raw(query, [title, content, id, imageURL])
        return newPost[0]
    }
    static async deletePost(id) {
        const query = `
        DELETE FROM post
        WHERE id = ?`
        const deletedPost = await db.raw(query, [id])
        return deletedPost
    }
}

export default Post