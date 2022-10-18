import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'

export const getAllDiaries = (_req: express.Request, res: express.Response): void => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
}

export const getDiary = (req: express.Request, res: express.Response): void => {
  const diary = diaryServices.findById(+req.params.id)

  diary != null
    ? res.send(diary)
    : res.sendStatus(404)
}

export const addDiary = (req: express.Request, res: express.Response): void => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export const deleteAllDiaries = (_req: express.Request, res: express.Response): void => {
  try {
    const diaries = diaryServices.deleteAllDiaries()

    res.json(diaries)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}
