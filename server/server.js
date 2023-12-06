import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import defaultRoutes from './router.js'
import { notFound, errorHandler } from './errorMiddleware.js'

dotenv.config()

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api', defaultRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
