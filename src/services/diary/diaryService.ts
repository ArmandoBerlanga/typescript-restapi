import data from '../diaries.json'
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../types/diary/diary-types'
import { diaryValidation } from './diaryValidation'

const diaries: DiaryEntry[] = data as DiaryEntry[]

export const getDiaries = (): DiaryEntry[] => diaries

export const getNonSensitiveDiaries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }))
}

export const getDiaryBy = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id)
    return entry
}

export const addDiary = (payload: NewDiaryEntry): DiaryEntry | string[] => {
    const errors = diaryValidation(payload)
    if (errors.length > 0)
        return errors

    const newDiary = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...payload
    }

    diaries.push(newDiary)
    return newDiary
}
