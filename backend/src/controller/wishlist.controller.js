import { prisma } from '../prisma.js';

export const postWishlist = async (req, res) => {
    const { gameId } = req.body;
    try {
        const wishlistItem = await prisma.wishlist.create({
            data: {
                userId: req.user.id,
                gameId: Number(gameId)
            }
        });
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getUserWishlist = async (req, res) => {
    try {
        const wishlist = await prisma.wishlist.findMany({
            where: { userId: req.user.id },
            include: { game: true } // Include game details
        });
        res.json(wishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteUserWishlist = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.wishlist.delete({
            where: { id: Number(id) }
        });
        res.json({ message: 'Wishlist item deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}