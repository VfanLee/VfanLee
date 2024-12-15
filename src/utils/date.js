import dayjs from 'dayjs'

export function format(date, template = 'YYYY-MM-DD HH:mm:ss') {
  return date ? dayjs(date).format(template) : ''
}
