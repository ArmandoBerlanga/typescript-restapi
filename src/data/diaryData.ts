import connect from '../middleware/database'
import { DiaryEntry, NewDiaryEntry } from '../types/diary/diary-types'

export const getDiariesFromDB = async (id: Number | null = null): Promise<DiaryEntry[]> => { 
    const sp = 'Info.GetDiaryEntry'

    const pool = await connect()
    const result = await pool.request()
        .input('ID', id)
        .execute(sp)
        
    return result.recordset
}

export const addDiaryToDB = async (payload: NewDiaryEntry): Promise<DiaryEntry> => {
    const sp = 'Info.AddDiaryEntry'

    const pool = await connect()
    const result = await pool.request()
        .input('Date', payload.date)
        .input('Weather', payload.weather)
        .input('Visibility', payload.visibility)
        .input('Comment', payload.comment)
        .execute(sp)
        
    return result.recordset[0]
}
