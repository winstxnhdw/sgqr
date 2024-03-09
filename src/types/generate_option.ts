import type { CountryCode, CurrencyCode, MerchantCity } from '@/types'

type NumberString = `${number}`

interface DefaultOptions {
  amount: NumberString
  expiry_date?: NumberString
  company_name?: string
  comments?: string
  country_code?: CountryCode
  merchant_city?: MerchantCity
  currency_code?: CurrencyCode
  editable?: boolean
}

interface GenerateUniqueEntityNumberOptions extends DefaultOptions {
  number: NumberString
  number_type?: 'UEN'
}

interface GenerateMobileOptions extends DefaultOptions {
  number: `+${NumberString}`
  number_type?: 'MOBILE'
}

interface GenerateCodeMobileOptions extends GenerateMobileOptions {
  type?: 'image/webp' | 'image/jpeg'
}

interface GenerateCodeUENOptions extends GenerateUniqueEntityNumberOptions {
  type?: 'image/webp' | 'image/jpeg'
}

export type GenerateOptions = GenerateUniqueEntityNumberOptions | GenerateMobileOptions

export type GenerateCodeOptions = GenerateCodeMobileOptions | GenerateCodeUENOptions
