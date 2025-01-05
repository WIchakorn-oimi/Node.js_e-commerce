const express = require('express')
const router = express.Router()
const { create, lsit, Remove } = require('../controllres/categorycon')

router.post('/category', create)
router.get('/category', lsit)
router.delete('/category/:id', Remove)


module.exports = router