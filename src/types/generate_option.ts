import type { CountryCode, CountryCodeAlpha, CurrencyCode, Digit, MerchantCity, StringNumber } from '@/types'

export type Amount<A extends string> =
  | StringNumber<A>
  | `${StringNumber<A>}.${Digit}${Digit}`
  | `${StringNumber<A>}.${Digit}`

export type ExpiryDate<E extends string> = StringNumber<E> | '20380119'

interface DefaultOptions<A extends string, E extends string> {
  amount: Amount<A>
  days_before_expiry?: number
  expiry_date?: ExpiryDate<E>
  company_name?: string
  comments?: string
  country_code?: CountryCodeAlpha
  merchant_city?: MerchantCity
  currency_code?: CurrencyCode
  editable?: boolean
}

interface GenerateUniqueEntityNumberOptions<A extends string, E extends string, N extends string>
  extends DefaultOptions<A, E> {
  number: StringNumber<N>
  number_type: 'UEN'
}

interface GenerateMobileOptions<A extends string, E extends string, N extends string> extends DefaultOptions<A, E> {
  number: `+${CountryCode}${StringNumber<N>}`
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
