
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
const isUserLoggedIn = require('./isUserLoggedIn');

const processOrder = async (req, res) => {
    const userId = req.user.id;
    try {
       const cartItems =  await Cart.find({user:userId})  
       if(cartItems.length === 0){
        return res.render('order', {orders:[], isUserLoggedIn: isUserLoggedIn(req) });
        // res.status(400).json({ message: "No items in cart" });
       }
       const orders = cartItems.map(item => ({
        user: item.user,
        product: item.product,
        quantity: item.quantity,
    }));



        await Order.insertMany(orders);
        for (let item of cartItems) {
            await Product.updateOne(
                { _id: item.product },
                { $inc: { stock: -item.quantity } }
            );
        }

        const ordersJoin = await Order.find({ user: userId })
        .populate({
            path: 'product',
            model: 'product',
            select: 'name price description image stock rating'
        })
        .exec();

        await Cart.deleteMany({ user: userId });

        res.render('order', { orders:ordersJoin, isUserLoggedIn: isUserLoggedIn(req) });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item from cart", error });
    }
}
const getAllOrders = async (req, res) => {
    const userId = req.user.id;
    try {
       const orderItems =  await Order.find({user:userId})  
       if(orderItems.length === 0){
        return res.render('order', {orders:orderItems, isUserLoggedIn: isUserLoggedIn(req) });
        // res.status(400).json({ message: "No items in cart" });
       }
       

        const ordersJoin = await Order.find({ user: userId })
        .populate({
            path: 'product',
            model: 'product',
            select: 'name price description image stock rating'
        })
        .exec();


        res.render('order', { orders:ordersJoin, isUserLoggedIn: isUserLoggedIn(req) });
    } catch (error) {
        res.status(500).json({error });
    }
}

module.exports = {
    processOrder,
    getAllOrders
}