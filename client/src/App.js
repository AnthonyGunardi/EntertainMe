import React from "react"
import "./App.css"
import { Switch, Route } from "react-router-dom"
import { Navigation, Footer } from "./components"
import { LandingPage, MoviesPage, SeriesPage, MovieDetailPage, SeriesDetailPage, Favorite } from "./pages"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div className="App">
      <Navigation />
      <header className="App-header">
        <Switch>
          <Route path="/movies/:id">
            <MovieDetailPage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/series/:id">
            <SeriesDetailPage />
          </Route>
          <Route path="/series">
            <SeriesPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path='/favorite'>
            <Favorite />
          </Route>
        </Switch>
      </header>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <Footer />
    </div>
  )
}

export default App