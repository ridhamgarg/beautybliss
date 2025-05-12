const express = require('express');
const router = express.Router();
const {renderCart, addToCart, deleteItem} = require('../controllers/cart');

router.get('/', renderCart);
router.post('/:id', addToCart);
router.get('/:id', deleteItem);


module.exports = router;