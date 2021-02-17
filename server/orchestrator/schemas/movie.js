const { gql } = require("apollo-server")
const axios = require("axios")
const Redis = require("ioredis")
const redis = new Redis()
const movieURL = "http://localhost:5001/movies"

const typeDefs = gql`
  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    getAllMovies: [Movies]
    getMovieById(id: ID): Movies
  }

  extend type Mutation {
    addMovie(movie: MovieInput): Movies
    updateMovie(id: ID, updates: MovieInput): Movies
    deleteMovie(id: ID): Movies
  }
`

const resolvers = {
  Query: {
    getAllMovies: async () => {
      try {
        const movieCache = await redis.get('movieCache')
        if (movieCache) {
          return JSON.parse(movieCache)
        } 
         else {
          const { data } = await axios.get(movieURL)
          const setCache = await redis.set('movieCache', JSON.stringify(data))
          return data
        }
      } 
      catch (error) {
        console.log(error)
      }
    },

    getMovieById: async (_, args) => {
      try {
        const { id } = args
        const { data } = await axios.get(`${movieURL}/${id}`)
        return data
      } 
      catch (error) {
        console.log(error)
      }
    },
  },

  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags} = args.data
        const { data } = await axios({
          method: 'POST',
          url: movieURL,
          data: { title, overview, poster_path, popularity, tags }
        })
        const delCache = await redis.del('movieCache')
        return data.ops[0]
      } 
      catch (err) {
        console.log(err)
      }
    },

    updateMovie: async(_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags } = args.data
        const { _id } = args
        const { data } = await axios({
          method: 'PUT',
          url: `${movieURL}/${_id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
        const delCache = redis.del('movieCache')
        return data
      } 
      catch (err) {
        console.log(err)
      }
    },

    deleteMovie: async(_, args) => {
      try {
        const { _id } = args
        const { data } = await axios({
          method: 'DELETE',
          url: `${movieURL}/${_id}`,
        })
        const delCache = redis.del('movieCache')
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