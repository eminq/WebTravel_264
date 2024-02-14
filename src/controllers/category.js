const express = require('express')
const router = express.Router()
const { create, getAll, getOneById, edit, remove } = require('../services/categoryService')

const { runValidation } = require("../validators/index");
const { categoryCreateValidator } = require("../validators/category");
const { requireLogin, adminMiddleware } = require('../services/authService'); 

router.post("/categories", categoryCreateValidator, runValidation, create, adminMiddleware, requireLogin);
router.get("/categories", getAll);
router.get("/categories/:categoryId", getOneById);
router.delete("/categories/:categoryId", remove, adminMiddleware, requireLogin);
router.put("/categories/:categoryId", edit, requireLogin, adminMiddleware);
 
module.exports = router 
