const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const movieURL = 'http://localhost:5001/movies'

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const moviecache = await redis.get('moviecache') 
      if(moviecache) {
        res.status(200).json(JSON.parse(moviecache))
      } 
       else {
        const { data } = await axios.get(movieURL)
        const setCache = await redis.set('moviecache', JSON.stringify(data))       
        res.status(200).json(data)
      }
    } 
    catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async addMovie(req, res) {
    try {
      const {title, overview, poster_path, popularity, tags} = req.body
      const { data } = await axios({
        method: 'POST',
        url: movieURL,
        data: { title, overview, poster_path, popularity, tags }
      })
      redis.del('moviecache')
      res.status(201).json(data)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async getMovieById(req, res) {
    try {
      const {id} = req.params
      const { data } = await axios.get(`${movieURL}/${id}`)
      res.status(200).json(data)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateMovie(req, res) {
    try {
      const {id} = req.params
      const {title, overview, poster_path, popularity, tags} = req.body
      const { data } = await axios({
        method: 'PUT',
        url: `${movieURL}/${id}`,
        data: { title, overview, poster_path, popularity, tags }
      })
      redis.del('moviecache')
      res.status(201).json(data)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteMovie(req, res) {
    try {
      const {id} = req.params    
      const delMovie = await axios({
        method: 'DELETE',
        url: `${movieURL}/${id}`
      })
      redis.del('moviecache')
      res.status(201).json({message: 'Movie is Deleted'})
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }
  
}

module.exports = MovieController