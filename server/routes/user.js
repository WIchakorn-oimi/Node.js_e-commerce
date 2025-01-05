const express = require('express')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const { listUsers,
    changStatus,
    changRole,
    userCart,
    getUserCart,
    emptyCart,
    saveorder,
    getorder,
    saveaddress } = require('../controllres/user')

router.get('/users', authCheck, adminCheck, listUsers)
router.post('/Chang-status', authCheck, adminCheck, changStatus)
router.post('/Chang-role', authCheck, adminCheck, changRole)

router.post('/user/cart', authCheck, userCart)
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)

router.post('/user/address', authCheck, saveaddress)

router.post('/user/order', authCheck, saveorder)
router.get('/user/order', authCheck, getorder)





module.exports = router