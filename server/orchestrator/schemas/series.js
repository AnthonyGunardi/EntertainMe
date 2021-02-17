const { gql } = require("apollo-server")
const axios = require("axios")
const Redis = require("ioredis")
const redis = new Redis()
const seriesURL = "http://localhost:5002/series"

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    getAllSeries: [Series]
    getSeriesById(id: ID): Series
  }

  extend type Mutation {
    addSeries(Series: SeriesInput): Series
    updateSeries(id: ID, updates: SeriesInput): Series
    deleteSeries(id: ID): Series
  }
`

const resolvers = {
  Query: {
    getAllTvSeries: async () => {
      try {
        const seriesCache = await redis.get('seriesCache')
        if (seriesCache) {
          return JSON.parse(seriesCache)
        } 
        else {
          const { data } = await axios.get(seriesURL)
          const setCache = await redis.set('seriesCache', JSON.stringify(data))
          return data
        }
      } 
      catch (error) {
        console.log(error)
      }
    },

    getTvSeriesById: async (_, args) => {
      try {
        const { id } = args
        const { data } = await axios.get(`${seriesURL}/${id}`)
        return data
      } 
      catch (error) {
        console.log(error)
      }
    },
  },

  Mutation: {
    addSeries: async (_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags} = args.data
        const { data } = await axios({
          method: 'POST',
          url: seriesURL,
          data: { title, overview, poster_path, popularity, tags }
        })
        const delCache = await redis.del('seriesCache')
        return data.ops[0]
      } 
      catch (err) {
        console.log(err)
      }
    },

    updateSeries: async(_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags} = args.data
        const { _id } = args
        const { data } = await axios({
          method: 'PUT',
          url: `${seriesURL}/${_id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
        const delCache = await redis.del('seriesCache')
        return data
      } 
      catch (err) {
        console.log(err)
      }
    },

    deleteSeries: async(_, args) => {
      try {
        const { _id } = args
        const { data } = await axios({
          method: 'DELETE',
          url: `${seriesURL}/${_id}`
        })
        const delCache = await redis.del('seriesCache')
        return data
      } 
      catch (err) {
        console.log(err)
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}