const router = require('express').Router()
const SeriesRouter = require('./SeriesRouter')

router.use('/series', SeriesRouter)

module.exports = router