const express = require('express');

const router = express.Router();


const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/account', usersController.account);
router.get('/sign-up', usersController.signUP);
router.get('/sign-in', usersController.signIN);
router.post('/create', usersController.create);

module.exports = router;