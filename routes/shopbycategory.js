const express = require('express');
const router = express.Router();
const {renderProducts} = require('../controllers/shopbycategory');


router.get('/:id', renderProducts);



module.exports = router;