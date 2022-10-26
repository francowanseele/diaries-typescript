import express from 'express'

import { addDiary, deleteAllDiaries, getAllDiaries, getDiary } from '../controllers/diaries'
import { getUserFromToken } from '../midleware/getUserFromToken'

const router = express.Router()

router.get('/', getAllDiaries)

router.get('/:id', getDiary)

router.post('/', [getUserFromToken], addDiary)

router.delete('/', [getUserFromToken], deleteAllDiaries)

export default router
