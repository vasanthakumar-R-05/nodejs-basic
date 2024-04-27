
const express = require('express')
const { createUser, validateUser } = require('../controllers/usercontrollers')
const router = express.Router()
router.post("/add-user", createUser);
router.post("/valid-user",validateUser );

module.exports = router