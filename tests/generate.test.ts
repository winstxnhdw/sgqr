import { generate } from '@/generate'
import { expect, test } from 'bun:test'

test('returns a valid SGQR text', () => {
  expect(generate({ number: '+650', amount: '0' })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003010040820380119520400005303702540105802SG59006009Singapore620401006304DFED',
  )

  expect(generate({ number: '+650', amount: '0', expiry_date: '0' })).toEqual(
    '00020101021226360009SG.PAYNOW010100204+6500301004010520400005303702540105802SG59006009Singapore6204010063042F19',
  )

  expect(generate({ number: '+650', amount: '0', company_name: '0' })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003010040820380119520400005303702540105802SG590106009Singapore6204010063042C43',
  )

  expect(generate({ number: '+650', amount: '0', comments: '0' })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003010040820380119520400005303702540105802SG59006009Singapore62050101063046FF4',
  )

  expect(generate({ number: '+650', amount: '0', country_code: 'US' })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003010040820380119520400005303702540105802US59006009Singapore6204010063047EF4',
  )

  expect(generate({ number: '+650', amount: '0', merchant_city: 'United States of America (the)' })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003010040820380119520400005303702540105802SG59006030United States of America (the)620401006304441F',
  )

  expect(generate({ number: '+650', amount: '0', currency_code: '840' })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003010040820380119520400005303840540105802SG59006009Singapore620401006304F487',
  )

  expect(generate({ number: '+650', amount: '0', editable: true })).toEqual(
    '00020101021226430009SG.PAYNOW010100204+65003011040820380119520400005303702540105802SG59006009Singapore620401006304E51A',
  )
})
