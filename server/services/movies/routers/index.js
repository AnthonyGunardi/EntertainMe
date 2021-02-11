const router = require('express').Router()
const MovieRouter = require('./MovieRouter')

router.use('/movies', MovieRouter)

module.exports = router