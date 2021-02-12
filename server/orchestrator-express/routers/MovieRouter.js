const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.getAllMovies)
router.post('/', MovieController.addMovie) 
router.get('/:id', MovieController.getMovieById)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router