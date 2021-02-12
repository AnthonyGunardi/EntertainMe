const router = require('express').Router()
const SeriesController = require('../controllers/SeriesController')

router.get('/', SeriesController.getAllSeries)
router.post('/', SeriesController.addSeries) 
router.get('/:id', SeriesController.getSeriesById)
router.put('/:id', SeriesController.updateSeries)
router.delete('/:id', SeriesController.deleteSeries)

module.exports = router