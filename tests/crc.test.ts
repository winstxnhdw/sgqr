import { crc16 } from '@/helpers'
import { expect, test } from 'bun:test'

test('returns the correct CRC-16 value for a given string', () => expect(crc16('hello world')).toEqual('EFEB'))

test('returns undefined if the input string contains a character with an undefined CRC-16 code', () =>
  expect(crc16('\u1000')).toBeUndefined())
