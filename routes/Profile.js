const express = require('express');
const passport = require('passport');
const profileController = require('../controllers/profileController');
const router = express.Router()
router.get('/profile', passport.authenticate('jwt', {session:false}), profileController.getProfile )

module.exports = router