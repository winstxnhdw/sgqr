import type { CountryCode, CountryCodeAlpha, CurrencyCode, MerchantCity } from '@/types'

type NumberString = `${number}`

interface DefaultOptions {
  amount: NumberString
  days_before_expiry?: number
  expiry_date?: NumberString
  company_name?: string
  comments?: string
  country_code?: CountryCodeAlpha
  merchant_city?: MerchantCity
  currency_code?: CurrencyCode
  editable?: boolean
}

interface GenerateUniqueEntityNumberOptions extends DefaultOptions {
  number: NumberString
  number_type?: 'UEN'
}

interface GenerateMobileOptions extends DefaultOptions {
  number: `+${CountryCode}${NumberString}`
  number_type?: 'MOBILE'
}

interface GenerateCodeMobileOptions extends GenerateMobileOptions {
  type?: 'image/webp' | 'image/jpeg' | 'image/png'
  scale?: number
}

interface GenerateCodeUENOptions extends GenerateUniqueEntityNumberOptions {
  type?: 'image/webp' | 'image/jpeg' | 'image/png'
  scale?: number
}

export type GenerateOptions = GenerateUniqueEntityNumberOptions | GenerateMobileOptions

export type GenerateCodeOptions = GenerateCodeMobileOptions | GenerateCodeUENOptions
