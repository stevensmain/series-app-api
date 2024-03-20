import TvSeriesIntervals from '../models/tv-series-interval.js'
import TvSeries from '../models/tv-series.js'
import { validatePartialSerie, validateSerie } from '../schemas/series.js'
import { formatSchedules } from '../utils.js'

async function getAll (req, res) {
  try {
    const series = await TvSeries.findAll({
      include: {
        model: TvSeriesIntervals,
        as: 'schedules',
        attributes: ['id', 'week_day', 'show_time']
      },
      attributes: ['id', 'title', 'channel', 'gender']
    })

    res.json(series)
  } catch (error) {
    res.status(500).send(error)
  }
}

async function create (req, res) {
  const result = validateSerie(req.body)

  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const { title, gender, channel, schedules } = result.data

  try {
    const newSerie = await TvSeries.create({
      title,
      gender,
      channel,
      schedules: formatSchedules(schedules)
    }, {
      include: {
        model: TvSeriesIntervals,
        as: 'schedules'
      }
    })

    res.status(201).json(newSerie)
  } catch (error) {
    res.status(500).json({ message: 'Error creating serie' })
  }
}

async function update (req, res) {
  const { id } = req.params

  const serie = await TvSeries.findByPk(id, {
    include: {
      model: TvSeriesIntervals,
      as: 'schedules'
    }
  })

  if (!serie) {
    return res.status(404).json({ message: 'Serie not found' })
  }

  const result = validatePartialSerie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  if (result.data.schedules) result.data.schedules = formatSchedules(result.data.schedules)

  try {
    await TvSeriesIntervals.destroy({ where: { tv_series_id: id } })

    result.data.schedules.forEach(async (schedule) => await TvSeriesIntervals.create({ tv_series_id: id, week_day: schedule.week_day, show_time: schedule.show_time }))

    serie.set({ ...result.data })

    await serie.save()

    return res.json(serie)
  } catch (error) {
    res.status(500).json({ message: 'Error updating serie' })
  }
}

async function remove (req, res) {
  const { id } = req.params
  const serie = await TvSeries.findByPk(id)

  if (!serie) {
    return res.status(400).json({ message: 'Series not found' })
  }

  await serie.destroy()

  return res.json({ message: 'Serie deleted' })
}

export { getAll, create, update, remove }
