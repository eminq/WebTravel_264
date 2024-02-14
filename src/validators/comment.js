const { check } = require('express-validator')

exports.commentCreateValidator = [
  check('text')
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ max: 350 })
    .withMessage("Category name can be 350 characters max"),
  check('date')
    .notEmpty()
    .isDate()
    .withMessage('Date must be correct format'),
  check('user')
    .notEmpty()
    .withMessage('User is required')
  // check('trip')
  //   .notEmpty()
  //   .withMessage('Trip is required')
]