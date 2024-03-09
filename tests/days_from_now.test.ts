import { get_days_from_now } from '@/helpers'
import { expect, test } from 'bun:test'

test('returns the correct date 9999 days later in YYYYMMDD format', () => {
  const days = 9999
  const formatted_date = get_days_from_now(days)
  const year = parseInt(formatted_date.substring(0, 4), 10)
  const month = parseInt(formatted_date.substring(4, 6), 10) - 1
  const day = parseInt(formatted_date.substring(6, 8), 10)
  const future_date = new Date(year, month, day)
  const current_date = new Date()

  current_date.setHours(0, 0, 0, 0)
  future_date.setHours(0, 0, 0, 0)

  expect((+future_date - +current_date) / (1000 * 60 * 60 * 24)).toEqual(days)
})

test('returns the date in a valid format', () => {
  const formatted_date = get_days_from_now(1234)
  const year = parseInt(formatted_date.substring(0, 4), 10)
  const month = parseInt(formatted_date.substring(4, 6), 10) - 1
  const day = parseInt(formatted_date.substring(6, 8), 10)
  const date = new Date(year, month, day)

  expect(/^\d{8}$/.test(formatted_date)).toEqual(true)
  expect(date.getFullYear()).toEqual(year)
  expect(date.getMonth()).toEqual(month)
  expect(date.getDate()).toEqual(day)
})
