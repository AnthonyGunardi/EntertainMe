import React from "react"
import { useQuery } from '@apollo/client'
import Card from "../components/Card"
import { GET_ALL } from "../queries"
import Loading from "../components/Loading"

const LandingPage = () => {
  const { loading, error, data } = useQuery(GET_ALL)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>Sorry, Our Website Encounter An Error. {error}</p>
  }

  return (
    <>
      <h1>ENTERTAIN ME</h1>
      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h2>MOVIES</h2>
        <div className="row justify-content-center m-2">
          {data.getAllMovies.map((movie) => {
            return <Card key={movie._id} content={movie} from={"movies"} />
          })}
        </div>
      </div>

      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h2>SERIES</h2>
        <div className="row justify-content-center m-2">
          {data.getAllSeries.map((series) => {
            return <Card key={series._id} content={series} from={"series"} />
          })}
        </div>
      </div>
    </>
  )
}

export default LandingPage