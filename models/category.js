const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
}, {timestamps: true})
const Category = mongoose.model('category', categorySchema);

module.exports = Category;