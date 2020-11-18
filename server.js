const express = require('express');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const redirect = require('./server/redirect.js')
var http = require('http'); 
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const dataSource = require('./server/datasource/datasource')
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
http.createServer(function (req, res) { 
  redirect.redirect_to(req,res);
})
.listen(process.env.PORT || 8085); 
