const { getDb } = require('../config/mongodb')
const db = getDb()
const movie = db.collection('Movies')
const { ObjectID } = require('mongodb')

class MovieModel {
  static getAllMovies() {
    return movie.find().toArray()
  }

  static addMovie(movieData) {
    return movie.insertOne(movieData)
  }

  static getMovieById(id) {
    return movie.findOne({
      _id: ObjectID(id)
    })
  }

  static updateMovie(id, movieData) {
    return movie.findOneAndUpdate({ _id: ObjectID(id)}, {$set: movieData}, {returnOriginal: false})
  }

  static deleteMovie(id) {
    return movie.deleteOne({
      _id: ObjectID(id)
    })
  }

}

module.exports = MovieModel
