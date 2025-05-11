const express = require('express');
const router = express.Router();
const {renderProducts} = require('../controllers/product');


router.get('/', renderProducts);



module.exports = router;