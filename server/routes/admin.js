const express = require('express')
const router = express.Router()
const { authCheck } = require('../middlewares/authCheck')
const { changorderStatus, getOrderAdmin} = require('../controllres/admin')


router.put('/admin/order-status', authCheck,changorderStatus)
router.get('/admin/orders',authCheck,getOrderAdmin)


module.exports = router
