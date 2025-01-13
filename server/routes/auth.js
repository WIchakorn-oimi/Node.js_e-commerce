// routes/auth.js

const express = require('express')
const router = express.Router()
const { register, login, currentUser, currentAdmin } = require('../controllres/funtion')
const { authCheck,adminCheck} = require('../middlewares/authCheck')

// ตั้งค่าเส้นทาง
router.post('/register', register)
router.post('/login', login)
router.post('/current-user',authCheck, currentUser)
router.post('/current-admin',authCheck,adminCheck,currentUser)

module.exports = router
