import express from 'express'
import { prisma } from '../prisma.js'
import { authenticateToken } from '../middleware/auth.js'
import { isAdmin } from '../middleware/adminCheck.js'

const router = express.Router()

//#region CRUD Games

// CREATE Game
router.post('/games', authenticateToken, isAdmin, async (req, res) => {
  const { title, genre, platform, releaseYear, price } = req.body
  try {
    const game = await prisma.game.create({
      data: { title, genre, platform, releaseYear, price }
    })
    res.status(201).json(game)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// READ Games
router.get('/games', authenticateToken, isAdmin, async (req, res) => {
  const games = await prisma.game.findMany()
  res.json(games)
})  

// UPDATE Game
router.put('/games/:id', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params
  const { title, genre, platform, releaseYear, price } = req.body
  try {
    const updated = await prisma.game.update({
      where: { id: Number(id) },
      data: { title, genre, platform, releaseYear, price }
    })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE Game
router.delete('/games/:id', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params
  try {
    await prisma.game.delete({ where: { id: Number(id) } })
    res.json({ message: 'Game deleted' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//#endregion

export default router