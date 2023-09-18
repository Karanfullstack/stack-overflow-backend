const express = require('express');
const router = express.Router()
const userController = require('../controllers/userAuth')
// REGISTER ROUTER
router.post("/register", userController.register)

module.exports = router