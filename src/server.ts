import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import usersRoutes from './handler/users'
import productsRoutes from './handler/products'
import ordersRoutes from './handler/orders'

const app: Application = express()

app.use(cors());
app.use(express.json())
usersRoutes(app)
productsRoutes(app)
ordersRoutes(app)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Express server listening on port ${process.env.SERVER_PORT}`)
})

module.exports = app