/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message
 *           example: Message
 *         status:
 *           type: number
 *           description: Status code
 *           example: 200
 *         payload:
 *           type: object
 *           description: Payload
 *           example: {}
 */
export interface Response {
    message: string
    status: number
    payload?: any
}
