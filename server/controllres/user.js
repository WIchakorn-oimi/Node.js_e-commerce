const prisma = require('../config/prisma')


exports.listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        })
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.changStatus = async (req, res) => {
    try {
        const { id, enabled } = req.body
        console.log(id, enabled)
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                enabled: enabled
            }
        })
        res.send('update sttus success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.changRole = async (req, res) => {
    try {
        const { id, role } = req.body
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                role: role
            }
        })
        res.send('update role success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.userCart = async (req, res) => {
    try {

        const { cart } = req.body
        console.log(cart)
        console.log(req.user.id)

        const user = await prisma.user.findFirst({
            where: {
                id: Number(req.user.id)
            }
        })
        // console.log(user)

        await prisma.productonCart.deleteMany({
            where: {
                cart: {
                    orderedById: user.id
                }
            }
        })

        await prisma.cart.deleteMany({
            where: {
                orderedById: user.id
            }
        })

        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price
        }))

        let cardTotal = products.reduce((sum, item) =>
            sum + item.price * item.count, 0)

        const newCart = await prisma.cart.create({
            data: {
                products: {
                    create: products
                },
                cartTotal: cardTotal,
                orderedById: user.id
            }
        })
        console.log(newCart)


        res.send('Add cart success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getUserCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        // console.log(cart)
        res.json({
            products : cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.emptyCart = async (req, res) => {
    try {

        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            }
        })
        if(!cart){
            return res.status(400).json({ message: 'No Cart'})
        }

        await prisma.productonCart.deleteMany({
            where: {
                cartId: cart.id 
            }
        })

        const result = await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.id)
            }
        })
        console.log(result)
        res.json({
            message: 'Cart empaty Success',
            deletedCount: result.count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.saveaddress = async (req, res) => {
    try {
        const { address } = req.body
        console.log(address)
        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id)
            },
            data: {
                address: address
            }
        })
        res.json({ok: true, message: 'address success'})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.saveorder = async (req, res) => {
    try {
        const userCart = await prisma.cart.findFirst({
            where:{
                orderedById :Number(req.user.id)
            },
            include: {
                products: true
            }
        })
        // console.log(userCart)
        if(!userCart || userCart.products.length === 0){
            return res.status(400).json({ ok:false, message: 'Cart is Empty'})
        }

        for(const item of userCart.products){
            // console.log(item)
            const product = await prisma.product.findUnique({
                where: {
                    id: item.productId
                },
                select: {
                    quantity: true,
                    title: true
                }
            })
            if(!product || item.count > product.quantity){
                return res.status(400).json({ ok:false,
                    message: `sold out!!! ${product?.title || 'product'}sold out!!!`
                })
            }
        }

        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                orderdBy:{
                    connect: {
                        id: req.user.id
                    }
                },
                cartTotal: userCart.cartTotal
            }
        })

        const update = userCart.products.map((item)=>({
            where: {
                id: item.productId
            },
            data: {
                quantity: {
                    decrement: item.count,
                },
                sold: {
                    increment: item.count
                },
            },
        }));

        await Promise.all(
            update.map((updated)=> prisma.product.update(updated))
        )

        await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.id)
            }
        })

        console.json({ok: true,
            order
        })

        res.json({ok: true, order})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getorder = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product:true
                    }
                }
            }
        })
        if(orders.length ===0 ) {
            return res.status(400).json({ ok:false, message: 'No Orders'})
        }


        console.log(orders)

        res.json({ok: true, orders})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

