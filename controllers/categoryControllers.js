import Category from "../models/Category.js"
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAllCategories()

        if (!categories) {
            throw new AppError('Categories not found', 404)
        }
        const cards = categories.map((category) => {
            return {
                title: category.name,
                imageURL: category.imageURL,
                id : category.id
            }
        })
        res.render('userAndCategory.ejs', { cards , content : 'category'})

    } catch (err) {
        next(err)

    }
}