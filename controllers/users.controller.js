const createError = require("http-errors");
const User = require("../models/User.Model");
require("../models/Movie.model")

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(404, "User not found"))
      } else {
        res.status(200).json(user)
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .populate({path: 'movies', options:{ sort: [{"movies": "desc"}] }})
    .sort({movies: "desc"})
    .then(user => {
      if (!user) {
        // not found
        next(createError(404, 'User not found'))
      } else {
        res.status(200).json(user)
      }
    })
    .catch(next)
}