import db from "../db/index.js";

class PostCategory {
    static async addCategoriesToPost(categories, postId) {
        let query = `
            INSERT INTO post_category (post_id, category_id)
            VALUES ( ? , ? )`
        const values = [postId, categories[0]]
        for (let i = 1; i < categories.length; i++) {
            values.push(postId)
            values.push(categories[i])
            query += ', ( ? , ? )'
        }

        query += ' RETURNING *'
        const results = await db.raw(query, values)
        return results
    }
}

export default PostCategory