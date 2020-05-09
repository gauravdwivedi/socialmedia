const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();

console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
//router.use('/likes', require('./likes'));
router.use('/likes', require('./likes'));

router.use('/api', require('./api'));

// router.get('/gaurav', homeController.gaurav); 
module.exports = router;
