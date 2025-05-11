const Category = require("../models/category");
const Product = require("../models/product");
const isUserLoggedIn = require("./isUserLoggedIn");

const renderProducts = async (req, res) => {
    try{
        const id = req.params.id;
        const category = await Category.findById(id);
          const products = await Product.find({ category: id });
          res.render("shopbycategory", { category, products, isUserLoggedIn: isUserLoggedIn(req) });
        
    }catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

module.exports = {
  renderProducts,
};
