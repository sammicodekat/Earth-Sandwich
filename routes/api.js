const express = require ('express')
const router = express.Router()

router.use('/places', require('./places'))

module.exports = router
