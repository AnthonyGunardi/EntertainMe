import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client'
import client from '../config/graphql'
import { toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import { GET_ONESERIES, UPDATE_SERIES } from "../queries/series"
import { GET_FAVORITES } from "../queries"
import Loading from "../components/Loading"

function SeriesDetailPage() {
  const { id } = useParams()
  const history = useHistory()

  const { loading, error, data, refetch } = useQuery(GET_ONESERIES, {
    variables: { _id: id }
  })

  const [updateSeries] = useMutation(UPDATE_SERIES)
  const [newTitle, setNewTitle] = useState('')
  const [newOverview, setNewOverview] = useState('')
  const [newPosterPath, setNewPosterPath] = useState('')
  const [newPopularity, setNewPopularity] = useState(0)
  const [newTags, setNewTags] = useState([])
  const [show, setShow] = useState(false)

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
    setNewTags(e.target.value)
  }

  const handleClose = () => setShow(false)

  async function handleUpdate (e) {
    e.preventDefault()
    let popular = Number(newPopularity)
    await updateSeries({
      variables: {
        _id: id,
        updates: {
          title: newTitle,
          overview: newOverview,
          poster_path: newPosterPath,
          popularity: popular,
          tags: newTags.split(",")
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
            src={data.getSeriesById.poster_path}
            alt={data.getSeriesById._id}
          />
        </div>
        <div className="col text-left mr-3">
          <h1 className="border p-2">{data.getSeriesById.title}</h1>
          <h6 className="border p-2">{data.getSeriesById.overview}</h6>
          <h3 className="border p-2">{data.getSeriesById.popularity}</h3>
          <h3 className="border p-2">
            {data.getSeriesById.tags.map((el) => {
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
          <button className="btn btn-danger m-2" onClick={addToFavorite}>
            Add Favorite
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Series</Modal.Title>
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

export default SeriesDetailPage