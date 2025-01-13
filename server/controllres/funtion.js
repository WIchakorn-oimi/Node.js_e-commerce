const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: 'Email is required!!!' })
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' })
        }

        // Check Emaill in db
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: "Email already exits" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword)

        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        res.send('register success')

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async (req, res) => {
    try {
        //code
        const { email, password } = req.body
        // Step 1 Check Email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user || !user.enabled) {
            return res.status(400).json({ message: 'User Not found or not Enabled' })
        }
        // Step 2 Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Password Invalid!!!' })
        }
        // Step 3 Create Payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        // Step 4 Generate Token
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" })
            }
            res.json({ payload, token })

        })
    } catch (err) {
        // err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.currentUser = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            },
            select:{
                id: true,
                email:true,
                name:true,
                role: true
            }
        })
        res.send({user})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

