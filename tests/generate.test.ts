import { generate } from '@/generate'
import { expect, test } from 'bun:test'

test('returns a valid SGQR text', () =>
  expect(generate({ number: '+650', amount: '0' })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003010040820380119520400005303702540105802SG59006009Singapore620401006304DFED',
  ))
