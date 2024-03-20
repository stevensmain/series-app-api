import z from 'zod'

const serieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Serie title must be a string',
    required_error: 'Serie title is required.'
  }).max(255),
  channel: z.string().max(100),
  gender: z.string().max(100),
  schedules: z.array(z.coerce.date())
})

export function validateSerie (input) {
  return serieSchema.safeParse(input)
}

export function validatePartialSerie (input) {
  return serieSchema.partial().safeParse(input)
}
