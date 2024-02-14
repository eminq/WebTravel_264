const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text of comment is required'],
    trim: true,
    max: 350
  },
  date : {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // trip: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Trip',
  //   required: true
  // }
}, { timestamps: true })


module.exports = mongoose.model('Comment', commentSchema)