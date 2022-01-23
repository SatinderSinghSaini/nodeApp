const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth');

router.post('/login',authController.postLogin);
router.get('/login',authController.getLogin);
router.post('/logout',authController.postLogout);

module.exports = router;