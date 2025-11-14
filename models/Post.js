import db from "../db/index.js";

class Post {
    static async findAll() {
        const query = `
        SELECT id, user_id, title, content, image_url, created_at
        FROM post
        `;
        const rows = await db.raw(query);
        return rows;
    }
}

export default Post