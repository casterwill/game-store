import express from 'express'
import { prisma } from '../prisma.js'

const router = express.Router()

router.get('/reviews', (req, res) => {
    const reviews = prisma.review.findMany({
        include: {
            user: true,
        }
    })
    res.json(reviews)
})

router.get('/wishlist', (req, res) => {
    const reviews = prisma.wishlist.findMany({
        include: {
            user: true,
        }
    })
    res.json(reviews)
})

export default router