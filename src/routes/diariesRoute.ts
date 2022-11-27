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
   *       401:
   *         description: Unauthorized
   */
router.get('/', verifyToken, (_req, res) => {
    const response: Response = {
        message: 'Diaries retrieved successfully',
        status: 200,
        payload: {}
    }

    diaryService.getNonSensitiveDiaries()
        .then(diaries => {
            response.payload = diaries
            res.json(response)
        })
        .catch(err => {
            response.message = 'Error retrieving diaries'
            response.status = 500
            response.payload = err.message
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
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Not found
   */
router.get('/:id', verifyToken, (req, res) => {
    const response: Response = {
        message: 'Diary retrieved successfully',
        status: 200,
        payload: {}
    }

    diaryService.getDiaryBy(+req.params.id)
        .then(diary => {
            response.payload = diary
            res.json(response)
        })
        .catch(err => {
            response.message = 'Error retrieving diary'
            response.status = 404
            response.payload = err.message
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
   *      400:
   *        description: Bad request
   *      401:
   *        description: Unauthorized
   *      500:
   *        description: Internal server error
   */
router.post('/', verifyToken, (req, res) => {
    const { date, weather, visibility, comment } = req.body

    const response: Response = {
        message: 'Diary added successfully',
        status: 200,
        payload: {}
    }

    diaryService.addDiary({
        date,
        weather,
        visibility,
        comment
    })
        .then(newDiary => {
            response.payload = newDiary
            
            if (newDiary instanceof Array) {
                response.message = 'Missing or incorrect parts of a diary entry'
                response.status = 400
                res.status(400).json(response)
            }

            res.json(response)
        })
        .catch(err => {
            response.message = 'Error adding diary'
            response.status = 500
            response.payload = err.message
            res.status(500).json(response)
        })  
})

export default router
