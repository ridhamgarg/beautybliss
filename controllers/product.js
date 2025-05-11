const Category = require("../models/category");
const Product = require("../models/product");

const renderProducts = async (req, res) => {
  const allCategories = await Category.find({});
  const allProducts = await Product.find({});
  res.render("products", { allCategories, allProducts });
};

module.exports = {
  renderProducts,
};
