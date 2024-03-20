export const formatSchedules = (dates = []) => {
  if (!dates.length) return []
  return dates.map(date => formatDate(date))
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const formatDate = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date)
  const [weekDay, showTime] = formatDate.split(' ')

  return { week_day: weekDay, show_time: showTime }
}
