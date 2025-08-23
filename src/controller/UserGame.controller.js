import { prisma } from '../prisma.js';

export const UserBuyGame = async (req, res) => {
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
}

export const GetOwnedGames = async (req, res) => {
    try {
        const userGames = await prisma.userGame.findMany({
            where: { userId: req.user.id },
            include: { game: true } // Include game details
        })
        res.json(userGames)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}