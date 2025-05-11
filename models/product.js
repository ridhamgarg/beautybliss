const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: Number,
    description: String,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    stock: Number,
    rating: Number,
}, {timestamps: true})
const Product = mongoose.model('product', productSchema);

module.exports = Product;