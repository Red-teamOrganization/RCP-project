require('dotenv').config()
require('./database/connection')
const sellerRoutes = require('../routes/sellers.api')
const soldProductsRoutes = require('../routes/sellerProducts.api')
const charityRoutes = require('../routes/charity.api')
const sellerDonationsRoutes = require('../routes/sellerDonations.api')
const express = require('express')
const cors= require('cors')
const path = require('path')

const app = express()

app.use(cors()) //to be able to deal with front-end.

const staticDir = path.join(__dirname, '../public')
app.use(express.static(staticDir))

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/seller",sellerRoutes)
app.use("/soldProducts",soldProductsRoutes)
app.use("/charity",charityRoutes)
app.use("/sellerDonations",sellerDonationsRoutes)
module.exports = app 