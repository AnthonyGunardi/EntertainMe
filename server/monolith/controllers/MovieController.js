const MovieModel = require('../models/Movie')

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await MovieModel.getAllMovies()
      res.status(200).json(movies)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async addMovie(req, res) {
    try {
      const {title, summary, posterUrl, genre} = req.body
      const { newMovie } = await MovieModel.addMovie({title, summary, posterUrl, genre})
      res.status(201).json(newMovie[0])
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async getMovieById(req, res) {
    try {
      const {id} = req.params
      const movie = await MovieModel.getMovieById(id)
      res.status(200).json(movie)
    } 
    catch (err) {
      res.status(500).json(err)     
    }
  }

  static async updateMovie(req, res) {
    try {
      const {id} = req.params
      const {title, summary, posterUrl, genre} = req.body
      const {value} = await MovieModel.updateMovie(id, {title, summary, posterUrl, genre})
      res.status(201).json(value)
    } 
    catch (err) {  
      res.status(500).json(err)   
    }
  }

  static async deleteMovie(req, res) {
    try {
      const {id} = req.params    
      const movie = await MovieModel.deleteMovie(id)     
      res.status(201).json({message: 'Movie is deleted.'})
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports =  MovieController