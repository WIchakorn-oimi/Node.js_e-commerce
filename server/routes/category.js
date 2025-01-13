const express = require('express')
const router = express.Router()
const { create, lsit, Remove } = require('../controllres/categorycon')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.post('/category', authCheck, adminCheck, create)
router.get('/category', authCheck, adminCheck, lsit)
router.delete('/category/:id', authCheck, adminCheck, Remove)


module.exports = router