
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

const processOrder = async (req, res) => {
    const userId = req.user.id;
    try {
       const cartItems =  await Cart.find({user:userId})  
       if(cartItems.length === 0){
        return res.render('orders', { message: "No items in cart", isUserLoggedIn: isUserLoggedIn(req) });
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
        
        await Cart.deleteMany({user:userId});

        const ordersJoin = await Order.find({ user: user.id })
        .populate({
            path: 'product',
            model: 'product',
            select: 'name price description image stock rating'
        })
        .exec();

        res.render('orders', { orders:ordersJoin, isUserLoggedIn: isUserLoggedIn(req) });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item from cart", error });
    }
}

module.exports = {
    processOrder
}