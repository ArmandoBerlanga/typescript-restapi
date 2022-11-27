import express from 'express'
import * as diaryService from '../services/diary/diaryService'
import { Response } from '../types/utils'
import { verifyToken } from '../middleware/jwt'

const router = express.Router()

/**
   * @swagger
   * /api/diaries:
   *  get:
   *     security:
   *     - Authorization: []
   *     tags:
   *     - Diaries
   *     summary: Returns all diaries entries
   *     responses:
   *       200:
   *         description: All diaries
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/Response'
   */
router.get('/', verifyToken, (_req, res) => {
    diaryService.getNonSensitiveDiaries()
        .then(diaries => {
            const response: Response = {
                message: 'Diaries retrieved successfully',
                status: 200,
                payload: diaries
            }
            res.json(response)
        })
        .catch(err => {
            const response: Response = {
                message: 'Error retrieving diaries',
                status: 500,
                payload: err.message
            }
            res.status(500).json(response)
        })
})

/**
   * @swagger
   * '/api/diaries/{id}':
   *  get:
   *     security:
   *     - Authorization: []
   *     tags:
   *     - Diaries
   *     summary: Returns a diary by id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: ID of diary to return
   *        required: true
   *     responses:
   *       200:
   *         description: Diary found by id
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/Response'
   *       404:
   *         description: Not found
   */
router.get('/:id', verifyToken, (req, res) => {
    diaryService.getDiaryBy(+req.params.id)
        .then(diary => {
            const response: Response = {
                message: 'Diary retrieved successfully',
                status: 200,
                payload: diary
            }
            res.json(response)
        })
        .catch(err => {
            const response: Response = {
                message: 'Error retrieving diary',
                status: 404,
                payload: err.message
            }
            res.status(404).json(response)
        })
})

/**
   * @swagger
   * '/api/diaries':
   *  post:
   *     security:
   *     - Authorization: []
   *     tags:
   *     - Diaries
   *     summary: Adds a new diary entry
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/NewDiaryEntry'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Response'
   *      500:
   *        description: Internal server error
   */
router.post('/', verifyToken, (req, res) => {
    const { date, weather, visibility, comment } = req.body

    const newDiary = diaryService.addDiary({
        date,
        weather,
        visibility,
        comment
    })

    const error = newDiary instanceof Array

    const response: Response = {
        message: error ? 'Errors at adding diary entry' : 'Diary entry added',
        status: error ? 500 : 200,
        payload: newDiary
    }

    res.json(response)
})

export default router
