const express = require('express');

const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/account', usersController.account);
router.get('/sign-up', usersController.signUP);
router.get('/sign-in', usersController.signIN);
router.post('/create', usersController.create);
router.get('/forgot-password', usersController.forgotPassword);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
) ,usersController.createSession);


router.get('/sign-out', usersController.destroySession);



router.get('auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('auth/google/callback', passport.authenticate('google', { failureRedirect: 'users/sign-in' }),
usersController.createSession);


module.exports = router;