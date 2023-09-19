const express = require('express');
const passport = require('passport');
const profileController = require('../controllers/profileController');
const router = express.Router()
// GETTING PROFILE
router.get('/profile', passport.authenticate('jwt', {session:false}), profileController.getProfile )

// UPDATING AND CREATING NEW PROFILE
router.post("/profile", passport.authenticate('jwt', {session:false}), profileController.createAndUpdateProfile)

// GETTING PROFILE BY USERNAME WITH PARAMS
router.get('/profile/:username', profileController.getProfileByUserName)

// GETTING PROFILE PARAMS URL
router.get("/profile/id/:id", profileController.getProfileByUrl)

// GETTING ALL PROFILE
router.get("/profile/get/all", profileController.getProfileAll)

module.exports = router;



