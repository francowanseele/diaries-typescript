import { Weather, Visibility } from './enums'

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>
// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

export interface UserEntry {
  id: number
  name: string
  lastname: string
  email: string
  password: string
}

export type NonSensitiveInfoUserEntry = Omit<UserEntry, 'password'>
export type NewUserEntry = Omit<UserEntry, 'id'>
export type LoginUserEntry = Pick<UserEntry, 'email' | 'password'>
