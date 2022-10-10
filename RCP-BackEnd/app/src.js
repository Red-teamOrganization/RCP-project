require('dotenv').config()
require('./database/connection')
const userRoutes = require('../routes/users.api')
const express = require('express')
const cors= require('cors')
const path = require('path')

const app = express()

app.use(cors()) //to be able to deal with front-end.

const staticDir = path.join(__dirname, '../public')
app.use(express.static(staticDir))

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/user",userRoutes)
module.exports = app 