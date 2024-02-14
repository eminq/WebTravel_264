const express = require('express')
const router = express.Router()
const { create, getAll, getOneById, remove, edit } = require("../services/tripService");

const { runValidation } = require("../validators/index");
const { tripCreateValidator } = require("../validators/trip");
const { requireLogin, adminMiddleware } = require('../services/authService');

router.post("/trips", tripCreateValidator, runValidation, create, adminMiddleware, requireLogin);
router.get("/trips", getAll);
router.get("/trips/:tripId", getOneById);
router.delete("/trips/:tripId", remove, requireLogin, adminMiddleware);
router.put("/trips/:tripId", edit, requireLogin, adminMiddleware);

module.exports = router; 