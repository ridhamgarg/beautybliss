const { response } = require("express");
const isUserLoggedIn = require("./isUserLoggedIn");
const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require("mongoose");

const renderCart = async(req, res) => {
    const user = req.user;
    const cartItems = await Cart.find({ user: user.id })
    .populate({
        path: 'product',
        model: 'product',
        select: 'name price description image stock rating'
    })
    .exec();
    res.render('cart', {cartItems: cartItems,
    totalPrice: cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0), isUserLoggedIn: isUserLoggedIn(req) });
}
const addToCart = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const quantity = req.body.quantity;
    const newCart = new Cart({
        user: user.id,
        product: id,
        quantity: quantity
    });
    try {
        await newCart.save();
        res.redirect('/products');
    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart", error });
    }
}

const deleteItem = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;
    try {
       const resp =  await Cart.find({product:productId, user:userId})
       await Cart.deleteOne(resp.id)
        res.redirect('/cart');
    } catch (error) {
        res.status(500).json({ message: "Error deleting item from cart", error });
    }
}   

module.exports = {
    renderCart,
    addToCart,
    deleteItem
}