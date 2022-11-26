import express from 'express'
import { generateToken } from '../middleware/jwt'
import { Response } from '../types/utils'

const router = express.Router()

/**
   * @swagger
   * /api/ping:
   *  get:
   *     tags:
   *     - Utils
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *        description: App is up and running
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Response'
   */
router.get('/ping', (_req, res) => {
    const response: Response = {
        message: 'App is up and running',
        status: 200,
        payload: {
            message: 'pong',
            date: new Date()
        }
    }

    res.json(response)
})

/**
   * @swagger
   * /api/token:
   *  get:
   *     tags:
   *     - Utils
   *     description: Responds with a JWT token
   *     responses:
   *       200:
   *        description: JWT token
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Response'
   */
 router.get('/token', (_req, res) => {
    const token = generateToken()

    const response: Response = {
        message: 'JWT token',
        status: 200,
        payload: {
            token
        }
    }

    res.json(response)
})

export default router
