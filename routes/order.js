const express = require('express');
const router = express.Router();
const {processOrder} = require('../controllers/order');

router.get('/', processOrder);


module.exports = router;