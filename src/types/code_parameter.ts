import type { Amount, CountryCode, CurrencyCode, DataObject } from '@/types'

interface PayloadFormatIndicator extends DataObject {
  id: '00'
  value: '01'
}

interface PointOfInitiationMethod extends DataObject {
  id: '01'
  value: '12'
}

interface MerchantAccountInformation extends DataObject {
  id: '26'
  value: string
}

interface MerchantCategoryCode extends DataObject {
  id: '52'
  value: '0000'
}

interface TransactionCurrency extends DataObject {
  id: '53'
  value: CurrencyCode
}

interface TransactionAmount<A extends string> {
  id: '54'
  value: Amount<A>
}

interface CountryCodeObject extends DataObject {
  id: '58'
  value: CountryCode
}

interface MerchantName extends DataObject {
  id: '59'
  value: string
}

interface MerchantCity extends DataObject {
  id: '60'
  value: string
}

interface AdditionalConsumerDataRequest extends DataObject {
  id: '62'
  value: string
}

export type CodeSpecification<A extends string> = readonly [
  PayloadFormatIndicator,
  PointOfInitiationMethod,
  MerchantAccountInformation,
  MerchantCategoryCode,
  TransactionCurrency,
  TransactionAmount<A>,
  CountryCodeObject,
  MerchantName,
  MerchantCity,
  AdditionalConsumerDataRequest,
]
