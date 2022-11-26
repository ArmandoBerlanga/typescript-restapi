/**
 * @swagger
 * components:
 *   schemas:
 *     DiaryEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID of diary entry
 *           example: 1
 *         date:
 *           type: string
 *           description: Date of diary entry
 *           example: 2020-01-01
 *         weather:
 *           type: string
 *           description: Weather of diary entry
 *           example: Sunny
 *         visibility:
 *           type: string
 *           description: Visibility of diary entry
 *           example: Good
 *         comment:
 *           type: string
 *           description: Comment of diary entry
 *           example: Comment
 */
export interface DiaryEntry {
    id: number
    date: string
    weather: Weather
    visibility: Visibility
    comment: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     NonSensitiveDiaryEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID of diary entry
 *           example: 1
 *         date:
 *           type: string
 *           description: Date of diary entry
 *           example: 2020-01-01
 *         weather:
 *           type: string
 *           description: Weather of diary entry
 *           example: Sunny
 *         visibility:
 *           type: string
 *           description: Visibility of diary entry
 *           example: Good
 */
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>

/**
 * @swagger
 * components:
 *   schemas:
 *     NewDiaryEntry:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: Date of diary entry
 *           example: 2020-01-01
 *         weather:
 *           type: string
 *           description: Weather of diary entry
 *           example: Sunny
 *         visibility:
 *           type: string
 *           description: Visibility of diary entry
 *           example: Good
 *         comment:
 *           type: string
 *           description: Comment of diary entry
 *           example: Comment
 */
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
