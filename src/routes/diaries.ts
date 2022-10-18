import express from 'express'
import { addDiary, deleteAllDiaries, getAllDiaries, getDiary } from '../controllers/diaries'

const router = express.Router()

router.get('/', getAllDiaries)

router.get('/:id', getDiary)

router.post('/', addDiary)

router.delete('/', deleteAllDiaries)

export default router
