const router = require('express').Router()
const MovieRouter = require('./MovieRouter')
const SeriesRouter = require('./SeriesRouter')

router.use('/movies', MovieRouter)
router.use('/series', SeriesRouter)

module.exports = router