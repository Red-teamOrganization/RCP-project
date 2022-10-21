require('dotenv').config()
require('./database/connection')
const userRoutes = require('../routes/user.api')
const soldProductsRoutes = require('../routes/sellerProducts.api')
const sellerDonationsRoutes = require('../routes/sellerDonations.api')
const producedProductsRoutes = require('../routes/producerProducts.api')
const producerDonationsRoutes = require('../routes/producerDonations.api')
const homeRoutes = require('../routes/home.api')
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
app.use("/soldProducts",soldProductsRoutes)
app.use("/sellerDonations",sellerDonationsRoutes)
app.use("/producedProducts",producedProductsRoutes)
app.use("/producerDonations",producerDonationsRoutes)
app.use(homeRoutes)

module.exports = app 