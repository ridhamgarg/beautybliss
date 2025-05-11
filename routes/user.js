const express = require('express');
const router = express.Router();
const {signInUser, logInUser} = require('../controllers/user');

router.post('/', signInUser);
router.post('/login', logInUser);

module.exports = router;