const express = require('express');

const router = express.Router();


const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/account', usersController.account);
module.exports = router;