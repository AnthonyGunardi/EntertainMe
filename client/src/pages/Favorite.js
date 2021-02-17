import React, { useState, useEffect } from 'react'
import Card from "../components/Card"
import client from '../config/graphql'
import { GET_FAVORITES } from '../queries/favorites'

const Favorite = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const { favorites: cacheFavorites } = client.readQuery({
      query: GET_FAVORITES
    })

    setFavorites(cacheFavorites)
  }, [])

  if(favorites.length === 0) {
    return (
      <p>You currently have no favorite movies / series.</p>
    )
  }
  return (
    <>
      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h2>Favorites</h2>
        <div className="row justify-content-center m-2">
          {
           favorites.map(favorite => {
            return (
              <Card key={favorite.id} content={favorite}/>
            )
           })
          }
        </div>
      </div>
    </>
  )
}

export default Favorite