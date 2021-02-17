import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client'
import client from '../config/graphql'
import { toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import { GET_MOVIE, DELETE_MOVIE, UPDATE_MOVIE } from "../queries/movies"
import { GET_FAVORITES } from "../queries"
import Loading from "../components/Loading"

function MovieDetailPage() {
  let { id } = useParams()
  const history = useHistory()
  let { loading, error, data, refetch } = useQuery(GET_MOVIE, {
    variables: { _id: id }
  })

  const [deleteMovie] = useMutation(DELETE_MOVIE)
  const [updateMovie] = useMutation(UPDATE_MOVIE)
  const [newTitle, setNewTitle] = useState('')
  const [newOverview, setNewOverview] = useState('')
  const [newPosterPath, setNewPosterPath] = useState('')
  const [newPopularity, setNewPopularity] = useState(0)
  const [newTags, setNewTags] = useState([])

  const handleTitle = (e) => {
    setNewTitle(e.target.value)
  }
  const handleOverview = (e) => {
    setNewOverview(e.target.value)
  }
  const handlePosterPath = (e) => {
    setNewPosterPath(e.target.value)
  }
  const handlePopularity = (e) => {
    setNewPopularity(e.target.value)
  }
  const handleTags = (e) => {
    setNewTags(e.target.value);
  }

  async function handleDelete(e) {
    e.preventDefault()
    await deleteMovie({ variables: { id } })
    refetch()
    toast.success("Successfully Deleted")
    history.goBack()
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const handleShow = () => {
    setNewTitle(data.getMovieById.title)
    setNewOverview(data.getMovieById.overview)
    setNewPosterPath(data.getMovieById.PosterPath)
    setNewPopularity(data.getMovieById.popularity)
    setNewTags(data.getMovieById.tags.join(","))
    setShow(true)
  }

  async function handleUpdate(e) {
    e.preventDefault()
    let popular = Number(newPopularity)
    await updateMovie({
      variables: {
        _id: id,
        updates: {
          title: newTitle,
          overview: newOverview,
          poster_path: newPosterPath,
          popularity: popular,
          tags: newTags.split(","),
        },
      },
    })
    refetch()
    toast.success("Successfully Updated")
    setShow(false)
  }

  const addToFavorite = (data) => {
    const { favorites: cacheFavorites } = client.readQuery({
      query: GET_FAVORITES
    })
    client.writeQuery({
      query: GET_FAVORITES,
      data: {
        favorites: [...cacheFavorites, data]
      }
    })
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>Sorry, Our Website Encounter An Error. {error}</p>
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <img
            style={{ width: "300px", padding: "0 10px 0 20px" }}
            src={data.getMovieById.poster_path}
            alt={data.getMovieById._id}
          />
        </div>
        <div className="col text-left mr-3">
          <h1 className="border p-2">{data.getMovieById.title}</h1>
          <h6 className="border p-2">{data.getMovieById.overview}</h6>
          <h3 className="border p-2">{data.getMovieById.popularity}</h3>
          <h3 className="border p-2">
            {data.getMovieById.tags.map((el) => {
              return (
                <button
                  className="btn btn-success m-1"
                  disabled
                  style={{ color: "white" }}
                  key={el}
                >
                  {el}
                </button>
              )
            })}
          </h3>
          <button
            className="btn btn-secondary m-2"
            onClick={() => history.goBack()}
          >
            Back
          </button>
          <button className="btn btn-primary m-2" onClick={handleShow}>
            Update
          </button>
          <button className="btn btn-danger m-2" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-danger m-2" onClick={addToFavorite}>
            Add Favorite
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="col-form-label">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleTitle}
                  value={newTitle}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Overview:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleOverview}
                  value={newOverview}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Poster Path:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlePosterPath}
                  value={newPosterPath}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Popularity:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlePopularity}
                  value={newPopularity}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Tags:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleTags}
                  value={newTags}
                />
              </div>
              <button type="submit" className="btn btn-primary m-2">
                Update
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default MovieDetailPage