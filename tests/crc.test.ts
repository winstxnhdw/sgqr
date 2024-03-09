import { crc16 } from '@/crc16'
import { expect, test } from 'bun:test'

test('returns the correct CRC-16 value for a given string', () => {
  const input = 'hello world'
  const result = crc16(input)
  expect(result).toEqual('EFEB')
})

test('returns undefined if the input string contains a character with an undefined CRC-16 code', () => {
  const input = '\u1000'
  const result = crc16(input)
  expect(result).toBeUndefined()
})
