const Movie = require("../models/Movie.model.js")

module.exports.create = (req, res, next) => {
  const movie = { title, description, user } = req.body
  console.log(movie)

  if (req.file) {
    movie.image = req.file.path
  }

  Movie.create(movie)
    .then(movie => res.status(200).json(movie))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => res.status(200).json(movie))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(movie => res.status(200).json(movie))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(movie => res.status(202).json(movie))
    .catch(next)
}