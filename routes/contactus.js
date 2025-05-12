const express = require('express');
const router = express.Router();
const {renderContactUs, postContactUs} = require('../controllers/contactus');

router.get('/', renderContactUs);
router.post('/', postContactUs);


module.exports = router;