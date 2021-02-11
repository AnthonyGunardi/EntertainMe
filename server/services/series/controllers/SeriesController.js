const SeriesModel = require('../models/Series')

class SeriesController {
  static async getAllSeries(req, res) {
    try {
      const series = await SeriesModel.getAllSeries()
      res.status(200).json(series)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async addSeries(req, res) {
    try {
      const {title, summary, posterUrl, genre} = req.body
      const { newSeries } = await SeriesModel.addSeries({title, summary, posterUrl, genre})
      res.status(201).json(newSeries[0])
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async getSeriesById(req, res) {
    try {
      const {id} = req.params
      const movie = await SeriesModel.getSeriesById(id)

      res.status(200).json(movie)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateSeries(req, res) {
    try {
      const {id} = req.params
      const {title, summary, posterUrl, genre} = req.body
      const {value} = await SeriesModel.updateSeries(id, {title, summary, posterUrl, genre})
      res.status(201).json(value)
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteSeries(req, res) {
    try {
      const {id} = req.params
      const series = await SeriesModel.deleteSeries(id)
      res.status(201).json({message: 'Series is deleted'})
    } 
    catch (err) {
      res.status(500).json(err)
    }
  }

}

module.exports = SeriesController