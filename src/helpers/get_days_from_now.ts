import { ExpiryDate } from '@/types'

export function get_days_from_now<E extends string>(days: number): ExpiryDate<E> {
  const date = new Date()
  date.setDate(date.getDate() + days)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}${month}${day}` as ExpiryDate<E>
}
