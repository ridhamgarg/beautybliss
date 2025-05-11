const Category = require('../models/category');

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({});
        res.render('home', { allCategories });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
}

module.exports = {
    getAllCategories
}