const express = require('express');
const router = express.Router();
const {renderProducts, getProductDetails} = require('../controllers/product');


router.get('/', renderProducts);
router.get('/:id', getProductDetails);



module.exports = router;