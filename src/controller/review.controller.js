import { prisma } from '../prisma.js';

export const postReview = async (req, res) => {
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
}

export const getGameReview = async (req, res) => {
    const { gameId } = req.body;
    try {
        const reviewGame = await prisma.review.findMany({
            where: { gameId: Number(gameId) },
        });
        res.json(wishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteGameReview = async (req, res) => {
    const { id } = req.params
    try {
        await prisma.review.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'Review deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}