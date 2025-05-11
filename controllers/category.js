const Category = require('../models/category');
const isUserLoggedIn = require("./isUserLoggedIn");

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({});
        res.render('home', { allCategories, isUserLoggedIn: isUserLoggedIn(req) });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
}

module.exports = {
    getAllCategories
}