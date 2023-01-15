import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB ,
    POSTGRES_USER ,
    POSTGRES_PASSWORD 
} = process.env

const client = new Pool({
    host: POSTGRES_HOST,
    port:5432,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    
})

export default client