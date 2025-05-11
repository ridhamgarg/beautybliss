const Category = require("../models/category");
const Product = require("../models/product");

const renderProducts = async (req, res) => {
  const allCategories = await Category.find({});
  const allProducts = await Product.find({});
  res.render("products", { allCategories, allProducts });
};
const getProductDetails = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render("detail", { product });
  };

module.exports = {
  renderProducts,
  getProductDetails
};
