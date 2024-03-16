import { crc16 } from '@/helpers'
import type { CodeParameter, GenerateOptions } from '@/types'

export function generate<A extends string, E extends string, N extends string>(
  options: GenerateOptions<A, E, N>,
): string | undefined {
  const {
    number,
    amount,
    expiry_date = '20380119',
    number_type = 'MOBILE',
    company_name = '',
    comments = '',
    country_code = 'SG',
    merchant_city = 'Singapore',
    currency_code = '702',
    editable = false,
  } = options

  const data: CodeParameter<A, E, N>[] = [
    { id: '00', value: '01' },
    { id: '01', value: '12' },
    {
      id: '26',
      value: [
        { id: '00', value: 'SG.PAYNOW' },
        { id: '01', value: number_type === 'MOBILE' ? '0' : '2' },
        { id: '02', value: number },
        { id: '03', value: editable ? '1' : '0' },
        { id: '04', value: expiry_date },
      ],
    },
    { id: '52', value: '0000' },
    { id: '53', value: currency_code },
    { id: '54', value: amount },
    { id: '58', value: country_code },
    { id: '59', value: company_name },
    { id: '60', value: merchant_city },
    { id: '62', value: [{ id: '01', value: comments }] },
  ]

  const parts = data.map((current) => {
    if (Array.isArray(current.value)) {
      const nested_string = current.value
        .map((c) => `${c.id}${c.value.length.toString().padStart(2, '0')}${c.value}`)
        .join('')

      return `${current.id}${nested_string.length.toString().padStart(2, '0')}${nested_string}`
    } else {
      return `${current.id}${current.value.length.toString().padStart(2, '0')}${current.value}`
    }
  })

  parts.push('6304')
  const joined_parts = parts.join('')
  const code = crc16(joined_parts)

  if (!code) {
    return undefined
  }

  return `${joined_parts}${code}`
}
