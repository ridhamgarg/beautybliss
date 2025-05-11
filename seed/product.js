const mongoose = require('mongoose');
const Product = require('../models/product');

const seedProducts = async() =>{
    
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/beautybliss')
        await Category.deleteMany({}); // Clear the collection
        await Category.insertMany(products);
        mongoose.connection.close();
    }catch{

    }
}
seedProducts();