const express = require ('express')
const router = express.Router()
const GoogleApi = require('../models/GoogleApi')

router.use((req, res, next) => {
  res.handle = (err, data) => res.status( err ? 400 : 200).send(err || data)
  next()
})

router.route('/:loc')
.get(( req, res ) => {
  GoogleApi.getPlaces(req.params.loc, res.handle)
})

module.exports = router
