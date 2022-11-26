import { Weather, Visibility } from '../../types/diary/diary-enums'

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String
}

const isDate = (param: string): boolean => {
    return Boolean(Date.parse(param))
}

const isWeather = (param: any): boolean => {
    return Object.values(Weather).includes(param)
}

const isVisibility = (param: any): boolean => {
    return Object.values(Visibility).includes(param)
}

export const diaryValidation = (payload: any): string[] => {
    const errors: string[] = []

    if (typeof payload !== 'object') {
        errors.push('Invalid payload')
        return errors
    }

    if (!isString(payload.date) || !isDate(payload.date))
        errors.push('Invalid or missing date')

    if (!isString(payload.weather) || !isWeather(payload.weather))
        errors.push('Invalid or missing weather')

    if (!isString(payload.visibility) || !isVisibility(payload.visibility))
        errors.push('Invalid or missing visibility')

    if (!isString(payload.comment) || payload.comment.length === 0)
        errors.push('Invalid or missing comment')

    return errors
}
