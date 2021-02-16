const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const seriesURL = 'http://localhost:5002/series'

class SeriesController {
  static async getAllSeries(req, res) {
    try {
      const seriescache = await redis.get('seriescache') 
      if(seriescache) {
        res.status(200).json(JSON.parse(seriescache))
      } 
       else {
        const { data } = await axios.get(seriesURL)
        const setCache = await redis.set('seriescache', JSON.stringify(data))       
        res.status(200).json(data)
      }
    } 
    catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async addSeries(req, res) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body
      const { data } = await axios({
        method: 'POST',
        url: seriesURL,
        data: { title, overview, poster_path, popularity, tags }
      })
      redis.del('seriescache')
      res.status(201).json(data)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async getSeriesById(req, res) {
    try {
      const {id} = req.params
      const { data } = await axios.get(`${seriesURL}/${id}`)
      res.status(200).json(data)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateSeries(req, res) {
    try {
      const { id } = req.params
      const { title, overview, poster_path, popularity, tags } = req.body
      const { data } = await axios({
        method: 'PUT',
        url: `${seriesURL}/${id}`,
        data: { title, overview, poster_path, popularity, tags }
      })
      redis.del('seriescache')
      res.status(201).json(data)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteSeries(req, res) {
    try {
      const {id} = req.params
      const delSeries = await axios({
        method: 'DELETE',
        url: `${seriesURL}/${id}`
      })
      redis.del('seriescache')
      res.status(201).json({message: 'Series is Deleted'})
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = SeriesController