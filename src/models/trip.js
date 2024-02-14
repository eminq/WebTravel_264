const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const tripSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Trip title is required'],
    trim: true,
    max: 150
  },
  description: {
    type: String,
    required: [true, 'Trip description is required'],
    trim: true,
    max: 255
  },
  imageURL: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Trip price is required']
  },
  capacity: {
    type: Number,
    required: [true, 'Trip capacity is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date of trip is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date of trip is required']
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  travelers : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }] 
}, { timestamps: true })


// tripSchema.post('findOneAndDelete', async function (doc) {
//   if(doc){
//       await Comment.deleteMany({
//           _id:{
//               $in: doc.comments
//           }
//       })
//   }
// })

module.exports = mongoose.model('Trip', tripSchema)