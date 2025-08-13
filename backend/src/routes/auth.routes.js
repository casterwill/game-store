import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'

const router = express.Router()

let saltRounds = 10

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })
    res.status(201).json({ message: 'User created', user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' })

    const token = jwt.sign(
      { userId: user.id, role: user.role }, // simpan role di token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
