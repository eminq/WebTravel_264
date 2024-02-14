const { errorHandler } = require('../helpers/dbErrorHandler');
const Trip = require('../models/trip')

exports.create = (req, res) => {
  const tripInfo = req.body;
  let trip = new Trip(tripInfo);
  trip
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
};

exports.getAll = (req, res) => {
  Trip.find({})
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
  const tripId = req.params.tripId;
  Trip.findOne({ _id: tripId })
    .populate({
      path: 'comments',
      populate: {
        path: 'user', 
      },
    })
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

exports.remove = (req, res) => {
  const tripId = req.params.tripId;
  Trip.findByIdAndDelete(tripId)
    .then(() => {
      res.json({
        message: "Trip deleted successfully",
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.edit = (req, res) => {
  const tripInfo = req.body;
  const tripId = req.params.tripId;

  Trip.findOneAndUpdate({ _id: tripId }, tripInfo)
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

