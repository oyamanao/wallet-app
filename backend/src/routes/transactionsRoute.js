import express from "express"
import {getTransactionsByUserId , getSummaryByUserId , createTransaction , deleteTransactionById} from "../controllers/transactionsController.js"


const router = express.Router()

router.get('/:userId',getTransactionsByUserId)

router.get('/summary/:userId', getSummaryByUserId)

router.post('/', createTransaction)

router.delete('/:id', deleteTransactionById)

export default router