const express = require('express')
const app = express()
const port = +process.env.PORT || 4000
const cors = require('cors')
const routers = require('./routers')

//middleware / body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
//routes
app.use(routers)
//listen
app.listen(port, () => console.log(`Monolith Server is listening on port ${port}`))


module.exports = app