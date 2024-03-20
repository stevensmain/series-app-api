import { Router } from 'express'
import * as seriesService from '../controllers/series.js'

export const tvSeriesRouter = Router()

tvSeriesRouter.get('/', seriesService.getAll)

tvSeriesRouter.post('/', seriesService.create)

tvSeriesRouter.put('/:id', seriesService.update)

tvSeriesRouter.delete('/:id', seriesService.remove)
