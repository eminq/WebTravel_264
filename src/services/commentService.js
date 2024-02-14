const { errorHandler } = require('../helpers/dbErrorHandler');
const Comment =require('../models/comment');
const Trip =require('../models/trip');

exports.create = async(req, res) => {
  console.log('Adding new comment!!!');
  const tripId = req.params.tripId;
  const commentInfo = req.body;
  let comment = new Comment(commentInfo);
  comment
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
  const trip = await Trip.findById(tripId);
  trip.comments.push(comment);
  await trip.save();
};

exports.getAll = (req, res) => {
   Comment.find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      if ((err = null)) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.getOneById = (req, res) => {
  const commentId = req.params.commentId;
  Comment.findOne({ _id: commentId })
    .then((data) => {
      return res.json(data);
    })
    .catch((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.remove = async(req, res) => {
  const { tripId, commentId } = req.params;
  Comment.findByIdAndDelete(commentId)
    .then(() => {
      res.json({
        message: "Comment deleted successfully",
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
  await Trip.findByIdAndUpdate(tripId, {$pull: {comments: commentId}});
};

exports.edit = (req, res) => {
  const commentInfo = req.body;
  const commentId = req.params.commentId;

  Comment.findOneAndUpdate({ _id: commentId }, commentInfo)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};