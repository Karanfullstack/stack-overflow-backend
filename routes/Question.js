const express = require('express');
const router = express.Router();
const passport = require('passport');
const questionController = require('../controllers/questionController');

// POST QUESTION
router.post('/question',passport.authenticate('jwt', {session:false}), questionController.postQuestion )

// GET QUESTION ALL
router.get('/question',passport.authenticate('jwt', {session:false}), questionController.getQuestions )

// GET QUESTION BY ID
router.get('/question/:id', passport.authenticate('jwt', {session:false}), questionController.getQuestionById )

//  UPVOTES TO QUESTION BY ID
router.post('/question/vote/:id', passport.authenticate('jwt', {session:false}), questionController.upVote)



//  ANSWER TO QUESTION BY ID
router.post('/question/answer/:id', passport.authenticate('jwt', {session:false}), questionController.postAnswer)


module.exports = router