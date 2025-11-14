import db from "../db/index.js"

class Category {
    static async findAllCategories() {
        const results = await db.raw('SELECT * FROM category;')
        return results
    }
}

export default Category