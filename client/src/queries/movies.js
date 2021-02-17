import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  {
    getAllMovies {
      _id
      poster_path
    }
  }
`

export const GET_MOVIE = gql`
  query getMovieById($_id: ID) {
    getMovieById(id: $_id) {
      _id
      poster_path
      overview
      popularity
      title
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addMovie(
      movie: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      poster_path
    }
  }
`

export const DELETE_MOVIE = gql`
mutation deleteMovie ($id: ID) {
  deleteMovie(_id:$id) {
    _id
  }
}
`

export const UPDATE_MOVIE = gql`
  mutation updateMovie($_id: ID, $updates: MovieInput) {
    updateMovie(id: $_id, updates: $updates) {
      _id
    }
  }
`