const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const movieURL = 'http://localhost:5001/movies'
const seriesURL = 'http://localhost:5002/series'

class EntertainController {
  static async getAllCategories(req, res) {
    try {
      const cache = await redis.get('cache') 
      if(cache) {
        res.status(200).json(JSON.parse(cache))
      } 
       else {
        const moviesData = await axios.get(movieURL)
        const seriesData = await axios.get(seriesURL)
        const data = {
          movies: moviesData.data,
          series: seriesData.data
        }
        const setCache = await redis.set('cache', JSON.stringify(data))      
        res.status(200).json(data)
       }
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = EntertainController