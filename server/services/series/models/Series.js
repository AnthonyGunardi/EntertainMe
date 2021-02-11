const { getDb } = require('../config/mongodb')
const db = getDb()
const series = db.collection('TV_Series')
const { ObjectID } = require('mongodb')

class SeriesModel {
  static getAllSeries() {
    return series.find().toArray()
  }

  static addSeries(seriesData) {
    return series.insertOne(seriesData)
  }

  static getSeriesById(id) {
    return series.findOne({ 
      _id: ObjectID(id)
    })
  }

  static updateSeries(id, seriesData) {
    return series.findOneAndUpdate({ _id: ObjectID(id)}, {$set: seriesData}, {returnOriginal: false })
  }

  static deleteSeries(id) {
    return series.deleteOne({
      _id: ObjectID(id)
    })
  }

}

module.exports = SeriesModel
