import type { Amount, CountryCode, CurrencyCode, DialingCode, ExpiryDate, NumberString } from '@/types'

interface DefaultOptions<A extends string, E extends string> {
  amount: Amount<A>
  expiry_date?: ExpiryDate<E>
  merchant_name?: string
  comments?: string
  country_code?: CountryCode
  merchant_city?: string
  currency_code?: CurrencyCode
  editable?: boolean
}

interface GenerateUniqueEntityNumberOptions<A extends string, E extends string, N extends string>
  extends DefaultOptions<A, E> {
  number: NumberString<N>
  number_type: 'UEN'
}

interface GenerateMobileOptions<A extends string, E extends string, N extends string> extends DefaultOptions<A, E> {
  number: `+${DialingCode}${NumberString<N>}`
  number_type?: 'MOBILE'
}

export type GenerateOptions<A extends string, E extends string, N extends string> =
  | GenerateUniqueEntityNumberOptions<A, E, N>
  | GenerateMobileOptions<A, E, N>

export type GenerateCodeOptions<A extends string, E extends string, N extends string> = GenerateOptions<A, E, N> & {
  type?: 'image/webp' | 'image/jpeg' | 'image/png'
  scale?: number
}

export type ConsoleGenerateCodeOptions = Omit<GenerateCodeOptions<string, string, string>, 'type'> & {
  output: string
  type?: 'image/webp' | 'image/jpeg' | 'image/png' | 'image/svg+xml'
}
