import express, { json } from 'express'
import cors from 'cors'
import { tvSeriesRouter } from './routes/tv-series.js'
import 'dotenv/config'

const app = express()

app.use(json())
app.use(cors({ origin: process.env.CLIENT_URL }))
app.disable('x-powered-by')

app.use('/series', tvSeriesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
