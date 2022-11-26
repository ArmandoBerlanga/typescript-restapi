import { Express } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { version } from '../../package.json'

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Diaries Entry API',
            version,
            description: 'API for managing diaries entries'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    value: 'Bearer <JWT token here>'
                }
            },
            security: {
            },
            schemas: {
            }
        }
    },
    apis: [
        './src/types/utils.d.ts', 
        './src/types/diary/diary-types.d.ts', 
        './src/routes/*.ts'
    ]
}

const swaggerSpec = swaggerJsDoc(options)

function setupSwagger (app: Express): void {
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger
