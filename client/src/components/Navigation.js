import React from "react"
import { Link } from "react-router-dom"

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="nav-item nav-link navbar-brand active" to="/">
        EntertainMe
      </Link>
      <span className="sr-only">(current)</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/movies/">
            Movies
          </Link>
          <Link className="nav-item nav-link active" to="/series/">
            Series
          </Link>
          <Link className="nav-item nav-link active" to="/favorite/">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation