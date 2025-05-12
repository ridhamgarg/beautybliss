const express = require('express');
const router = express.Router();
const {processOrder, getAllOrders} = require('../controllers/order');

router.get('/', getAllOrders);
router.get('/process', processOrder);


module.exports = router;