const express = require('express');
const router = express.Router();
const {renderCart} = require('../controllers/cart');

router.get('/', renderCart);

module.exports = router;