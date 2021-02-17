import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/client'
import Card from "../components/Card"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { GET_SERIES, ADD_SERIES } from "../queries/series"
import Loading from "../components/Loading"

const SeriesPage = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { loading, error, data } = useQuery(GET_SERIES)

  const [addSeries] = useMutation(ADD_SERIES, {
    update(cache, { data: { addSeries } }) {
      const { getAllSeries } = cache.readQuery({ query: GET_SERIES })
      cache.writeQuery({
        query: GET_SERIES,
        data: { getAllSeries: getAllSeries.concat([addSeries]) },
      })
    },
  })

  const newCreate = {}
  const [newTitle, setNewTitle] = useState('')
  const [newOverview, setNewOverview] = useState('')
  const [newPoster_path, setNewPoster_path] = useState('')
  const [newPopularity, setNewPopularity] = useState(0)
  const [newTags, setNewTags] = useState([])

  const handleAdd = (e) => {
    e.preventDefault();
    newCreate.title = newTitle
    newCreate.overview = newOverview
    newCreate.poster_path = newPoster_path
    newCreate.popularity = +newPopularity
    newCreate.tags = newTags.split(",").map((el) => el.trim())

    addSeries({ 
      variables: newCreate,
      refetchQueries: [{
        query: GET_SERIES
      }]
  })
    toast.success("Successfully Added")

    setNewTitle('')
    setNewOverview('')
    setNewPoster_path('')
    setNewPopularity(0)
    setNewTags([])
    setShow(false)
  }

  const handleTitle = (e) => {
    setNewTitle(e.target.value)
  }
  const handleOverview = (e) => {
    setNewOverview(e.target.value)
  }
  const handlePoster_path = (e) => {
    setNewPoster_path(e.target.value)
  }
  const handlePopularity = (e) => {
    setNewPopularity(e.target.value)
  }
  const handleTags = (e) => {
    setNewTags(e.target.value)
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>Sorry, Our Website Encounter An Error. {error}</p>
  }

  return (
    <>
      <h1>SERIES</h1>

      <button className="btn btn-primary m-2" onClick={handleShow}>
        Add New Series
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Series</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label className="col-form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleTitle}
                value={newCreate.title}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Overview:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleOverview}
                value={newCreate.overview}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Poster Path:</label>
              <input
                type="text"
                className="form-control"
                onChange={handlePoster_path}
                value={newCreate.poster_path}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Popularity:</label>
              <input
                type="text"
                className="form-control"
                onChange={handlePopularity}
                value={newCreate.popularity}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Tags:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleTags}
                value={newCreate.tags}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary m-2">
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="cardColumns">
        {data.getAllSeries.map((series) => {
          return <Card key={series._id} content={series} from={"/series"}></Card>
        })}
      </div>
    </>
  )
}

export default SeriesPage