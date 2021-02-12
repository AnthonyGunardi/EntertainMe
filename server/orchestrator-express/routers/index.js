const router = require('express').Router()
const MovieRouter = require('./MovieRouter')
const SeriesRouter = require('./SeriesRouter')
const EntertainController = require('../controllers/EntertainController')

router.get('/', EntertainController.getAllCategories)
router.use('/movies', MovieRouter)
router.use('/series', SeriesRouter)

module.exports = router