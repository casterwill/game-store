import express from 'express'
import { prisma } from '../prisma.js'
import { authenticateToken } from '../middleware/auth.js'
import * as wishlist from '../controller/wishlist.controller.js'
import * as review from '../controller/review.controller.js'
import * as UserGame from '../controller/UserGame.controller.js'
import { use } from 'react'

const router = express.Router()

// READ Games


//#region Wishlist Routes
router.post('/wishlist', authenticateToken, wishlist.postWishlist);
router.get('/wishlist', authenticateToken, wishlist.getUserWishlist);
router.delete('/wishlist/:id', authenticateToken, wishlist.deleteUserWishlist)
//#endregion

//#region Review Routes
router.post('/review', authenticateToken, review.postReview);
router.get('/review', authenticateToken, review.getGameReview);
router.delete('/review/:id', authenticateToken, review.deleteGameReview);
//#endregion

//#region User Games
router.post('/games', authenticateToken, UserGame.UserBuyGame)
router.get('/games/owned', authenticateToken, UserGame.GetOwnedGames)
//#endregion

export default router