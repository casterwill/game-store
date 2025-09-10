// src/middleware/auth.js
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    next()
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' })
  }
}
