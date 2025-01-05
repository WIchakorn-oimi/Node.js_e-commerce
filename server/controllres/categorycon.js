const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {
    try {

        const { name } = req.body
        const category = await prisma.category.create({
            data: {
                name: name
            }
        })
        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
exports.lsit = async (req, res) => {
    try {
        const category = await prisma.category.findMany()
        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
exports.Remove = async (req, res) => {
    try {
        const { id } = req.params
        const category = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })
        console.log(category)
        res.send('Remove success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

