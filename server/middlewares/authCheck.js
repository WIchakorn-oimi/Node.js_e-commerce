const prisma = require('../config/prisma')
const jwt = require('jsonwebtoken')


exports.authCheck = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization
        console.log(headerToken)
        if (!headerToken) {
            res.status(401).json({ message: 'No token authorization' })
        }
        const token = headerToken.split(" ")[1]

        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode

        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })
        if (!user.enabled) {
            return res.status(400).json({ message: 'This account cannot access' })
        }
        console.log(user)
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Token Invalid' })
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user

        const adminUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!adminUser || adminUser.role != 'admin') {
            return res.status(403).json({ message: 'Acess Denied Admin' })
        }
        // console.log('admin',adminUser)
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error Admin access' })

    }
}