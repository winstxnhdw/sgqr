import type { DataObject, DialingCode, ExpiryDate, NumberString } from '@/types'

interface GloballyUniqueIdentifier extends DataObject {
  id: '00'
  value: string
}

interface ProxyType extends DataObject {
  id: '01'
  value: '0' | '2'
}

interface ProxyValue<N extends string> extends DataObject {
  id: '02'
  value: NumberString<N> | `+${DialingCode}${NumberString<N>}`
}

interface Editable extends DataObject {
  id: '03'
  value: '0' | '1'
}

interface ExpiryDateRecord<E extends string> extends DataObject {
  id: '04'
  value: ExpiryDate<E>
}

export type MerchantAccountInformation<E extends string, N extends string> = readonly [
  GloballyUniqueIdentifier,
  ProxyType,
  ProxyValue<N>,
  Editable,
  ExpiryDateRecord<E>,
]
