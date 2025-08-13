import express from 'express'
import { prisma } from '../prisma.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// READ Games
router.get('/games', authenticateToken, async (req, res) => {
  const games = await prisma.game.findMany()
  res.json(games)
})  

//#region Wishlist Routes

// CREATE Wishlist Item
router.post('/wishlist', authenticateToken, async (req, res) => {
    const { gameId } = req.body
    try {
        const wishlistItem = await prisma.wishlist.create({
        data: {
            userId: req.user.id,
            gameId: Number(gameId)
        }
        })
        res.status(201).json(wishlistItem)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// READ Wishlist
router.get('/wishlist', authenticateToken, async (req, res) => {
    try {
        const wishlist = await prisma.wishlist.findMany({
            where: { userId: req.user.id },
            include: { game: true } // Include game details
        })
        res.json(wishlist)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// DELETE Wishlist Item
router.delete('/wishlist/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    try {
        await prisma.wishlist.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'Wishlist item deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//#endregion

//#region Review Routes

// Post Review
router.post('/review', authenticateToken, async (req, res) => {
    const { rating, comment, gameId } = req.body
    try {
        const reviewGame = await prisma.review.create({
        data: {
            rating: rating,
            comment: comment,
            userId: req.user.id,
            gameId: Number(gameId)
        }
        })  
        res.status(201).json(reviewGame)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Get Reviews by User
router.get('/review', authenticateToken, async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { userId: req.user.id },
            include: { game: true } // Include game details
        })
        res.json(reviews)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// DELETE User Review
router.delete('/review/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    try {
        await prisma.review.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'Review deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//#endregion

//#region User Games

// POST User Game
router.post('/games', authenticateToken, async (req, res) => {
    const { gameId } = req.body
    try {
        const userGame = await prisma.userGame.create({
        data: {
            userId: req.user.id,
            gameId: Number(gameId)
        }
        })
        res.status(201).json(userGame)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//GET Owned Games
router.get('/games/owned', authenticateToken, async (req, res) => {
    try {
        const userGames = await prisma.userGame.findMany({
            where: { userId: req.user.id },
            include: { game: true } // Include game details
        })
        res.json(userGames)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//#endregion

export default router