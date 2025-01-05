const prisma = require("../config/prisma")

exports.create = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body
        // console.log(title, description, price, quantity, images )

        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.list = async (req, res) => {
    try {

        const { count } = req.params
        const product = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createAt: 'desc' },
            include: {
                category: true,
                images: true
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.read = async (req, res) => {
    try {

        const { id } = req.params
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.update = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body
        // console.log(title, description, price, quantity, images )

        await prisma.image.deleteMany({
            where: {
                productId: Number(req.params.id)
            }
        })

        const product = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },

            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        res.send('delete success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.listby = async (req, res) => {
    try {
        const { sort, order, limit } = req.body
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: {
                category: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            include: {
                category: true,
                images: true
            }

        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error" })
    }
}

const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }

        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error" })
    }
}

const handleCatgory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true
            }

        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error" })
    }
}

exports.searchFilters = async (req, res) => {
    try {
        const { query, category, price } = req.body
        if (query) {
            console.log('query', query)
            await handleQuery(req, res, query)
        }
        if (category) {
            console.log('category', category)
            await handleCatgory(req, res, category)
        }
        if (price) {
            console.log('price--->', price)
            await handlePrice(req, res, price)
        }

        // res.send('searchFilters success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}