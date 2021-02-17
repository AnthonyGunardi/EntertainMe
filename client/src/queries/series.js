import { gql } from '@apollo/client'

export const GET_SERIES = gql`
  {
    getAllSeries {
      _id
      poster_path
    }
  }
`;

export const GET_ONESERIES = gql`
  query getSeriesById($_id: ID) {
    getSeriesById(id: $_id) {
      _id
      poster_path
      overview
      popularity
      title
      tags
    }
  }
`;

export const ADD_SERIES = gql`
  mutation addSeries(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addSeries(
      series: {
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

export const DELETE_SERIES = gql`
  mutation deleteSeries($id: ID) {
    deleteSeries(id: $id) {
      _id
    }
  }
`

export const UPDATE_SERIES = gql`
  mutation updateSeries($_id: ID, $updates: series) {
    updateSeries(id: $_id, updates: $updates) {
      _id
    }
  }
`