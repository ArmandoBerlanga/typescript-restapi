import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../types/diary/diary-types'
import { diaryValidation } from './diaryValidation'
import { getDiariesFromDB } from '../../data/diaryData'

let diaries: DiaryEntry[]

export const getNonSensitiveDiaries = async (): Promise<NonSensitiveDiaryEntry[]> => {   
    const diaries: DiaryEntry[] = await getDiariesFromDB()

    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }))
}

export const getDiaryBy = async (id: Number): Promise<DiaryEntry> => {
    const diaries: DiaryEntry[] = await getDiariesFromDB(id)

    if (diaries.length === 0)
        throw new Error(`Diary with id ${+id} not found`)
    return diaries[0]
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
