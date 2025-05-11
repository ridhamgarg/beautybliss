const mongoose = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');
const axios = require('axios');

const seedCategories = async() =>{
  
    try {
        const resp = await axios.get("https://makeup-api.herokuapp.com/api/v1/products.json");
    
        // Map categories from API response
        const categories = resp.data.map(item => ({
            name: item.product_type,
            image: item.image_link,
        }));
    
        // Remove duplicates
        const uniqueCategories = Array.from(new Map(categories.map(item => [item.name, item])).values());
    
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/beautybliss');
        
        // Clear and insert categories
        await Category.deleteMany({});
        const insertedCategories = await Category.insertMany(uniqueCategories);
    
        // Create a category map to fetch the ObjectId easily
        const categoryMap = insertedCategories.reduce((acc, category) => {
            acc[category.name] = category._id;
            return acc;
        }, {});
    
        // Map products and link them with category ObjectId
        const products = resp.data.map(item => ({
            name: item.name,
            image: item.image_link,
            price: Math.round(item.price * 50),
            description: item.description,
            stock: Math.floor(Math.random() * 100),
            rating: item.rating,
            category: categoryMap[item.product_type] || null, // Assign category ObjectId
        }));
    
        // Remove duplicates and filter out products with price 0
        const uniqueProducts = Array.from(
            new Map(products
                .filter(item => item.price > 0) // Remove items with price 0
                .map(item => [item.name, item])
            ).values()
        );
    
        // Clear and insert products
        await Product.deleteMany({});
        await Product.insertMany(uniqueProducts);
    
        mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error.message);
    }
    
}
seedCategories();