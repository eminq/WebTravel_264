const Trip = require("../models/trip")
const User = require("../models/user")

exports.getAll = (req, res) => {
  User.find({})
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
  const userId = req.params.userId;
  User.findOne({ _id: userId })
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
  const userId = req.params.userId;
  User.findOneAndDelete({ _id: userId })
    .then(() => {
      res.json({
        message: "User deleted successfully",
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
  const userInfo = req.body;
  const userId = req.params.userId;

  User.findOneAndUpdate({ _id: userId }, userInfo)
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

exports.addTrip = async(req, res) => {
  const { userId, tripId } = req.params;

  const user = await User.findById(userId);
  const trip = await Trip.findById(tripId);
  //console.log(user,trip);
  user.trips.push(trip);
  trip.travelers.push(user);
  await user.save();
  await trip.save();
  res.json(user);
};
