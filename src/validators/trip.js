const { check } = require("express-validator");

exports.tripCreateValidator = [
  check("title")
    .notEmpty()
    .withMessage("Trip title is required")
    .isLength({ max: 150 })
    .withMessage("Product name can be 150 characters max"),
  check("description")
    .notEmpty()
    .withMessage("Trip description is required")
    .isLength({ max: 255 })
    .withMessage("Product content can be 255 characters max"),
  check("price")
    .notEmpty()
    .withMessage("Price is required"),
  check("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Date must be the right format"),
  check("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isDate()
    .withMessage("Date must be the right format"),
  check("capacity")
    .notEmpty()
    .withMessage("Capacity is required")
];