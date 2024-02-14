const express = require('express')
const router = express.Router()
const { create, getAll, getOneById, edit, remove } = require('../services/commentService')

const { runValidation } = require("../validators/index");
const { commentCreateValidator } = require("../validators/comment");
const { requireLogin, adminMiddleware } = require('../services/authService'); 

router.post("/comments/:tripId", commentCreateValidator, create, requireLogin); //runValidation,
router.get("/comments", getAll);
router.get("/comments/:commentId", getOneById);
router.delete("/comments/:commentId/:tripId", remove, adminMiddleware, requireLogin);
router.patch("/comments/:commentId", edit, requireLogin, adminMiddleware);
 
module.exports = router 
