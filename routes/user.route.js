const express = require('express');
const router = express.Router();
const { getAllUsers, signUp, signIn } = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

module.exports = router;