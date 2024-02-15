const express = require('express')
const router = express.Router()
const { getAll, getOneById, remove, edit, addTrip } = require('../services/userService')

const { requireLogin, adminMiddleware } = require('../services/authService'); 

router.get('/users', getAll, adminMiddleware, requireLogin)
router.get('/users/:userId', getOneById, adminMiddleware, requireLogin)
router.delete('/users/:userId', remove, adminMiddleware, requireLogin)
router.patch('/users/:userId', edit, adminMiddleware, requireLogin)
router.post('/users/:userId/:tripId', addTrip, requireLogin)

module.exports = router 