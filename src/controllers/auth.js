const express = require('express')
const router = express.Router()
const { register, login, loggedInUser, authenticateToken } = require('../services/authService')

router.post('/auth/register', register)
router.post('/auth/login', login)
//router.get('/auth/user', authenticateToken, loggedInUser)


module.exports = router