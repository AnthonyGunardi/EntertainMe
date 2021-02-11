const MovieController = require('../controllers/MovieController')

const router = require('express').Router()

router.get('/', MovieController.getAllMovies)
router.post('/', MovieController.addMovie)
router.get('/:id', MovieController.getMovieById)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router