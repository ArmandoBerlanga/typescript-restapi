import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../types/diary/diary-types'
import { diaryValidation } from './diaryValidation'
import { getDiariesFromDB, addDiaryToDB } from '../../data/diaryData'

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

export const addDiary = async (payload: NewDiaryEntry): Promise<DiaryEntry | string[]> => {
    const comments = diaryValidation(payload)
    if (comments.length > 0)
        return comments

    const newDiary: DiaryEntry = await addDiaryToDB(payload)
    return newDiary
}
