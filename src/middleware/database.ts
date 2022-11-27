import sql, { config } from 'mssql'
import dotenv from 'dotenv'

dotenv.config()

export const dbSettings: config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env?.DB_SERVER ?? 'localhost',
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function connect (): Promise<sql.ConnectionPool> {
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (error) {
        console.error('Error al conectar a la base de datos')
        throw error
    }
}

export default connect
