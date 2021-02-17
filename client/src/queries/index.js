import { gql } from '@apollo/client'

export const GET_ALL = gql`
  {
    getAllMovies {
      _id
      poster_path
    }
    getAllSeries {
      _id
      poster_path
    }
  }
`

export const GET_FAVORITES = gql `
  query getFavorites {
    favorites {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`