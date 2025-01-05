// routes/auth.js

const express = require('express')
const router = express.Router()
const { register, login, currentUser } = require('../controllres/funtion')

// ตั้งค่าเส้นทาง
router.post('/register', register)
router.post('/login', login)
router.post('/current-user', currentUser)
// router.post('/current-admin',currentAdmin)

module.exports = router
