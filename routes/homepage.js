const express = require('express');
const router = express.Router();
const {getAllCategories} = require('../controllers/category');
const {renderAboutUs} = require('../controllers/homepage');

router.get('/', getAllCategories);
router.get('/aboutus', renderAboutUs);

module.exports = router;