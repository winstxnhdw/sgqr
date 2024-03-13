import type { Amount, CountryCode, ExpiryDate, NumberString } from '@/types'

interface CodeParameterGeneric {
  id: '00' | '01' | '52' | '53' | '54' | '58' | '59' | '60'
  value: string
}

interface CodeParameter62 {
  id: '62'
  value: [{ id: '01'; value: string }]
}

interface CodeParameter54<A extends string> {
  id: '54'
  value: Amount<A>
}

interface CodeParameter26<E extends string, N extends string> {
  id: '26'
  value: [
    { id: '00'; value: 'SG.PAYNOW' },
    { id: '01'; value: '0' | '2' },
    { id: '02'; value: NumberString<N> | `+${CountryCode}${NumberString<N>}` },
    { id: '03'; value: '0' | '1' },
    { id: '04'; value: ExpiryDate<E> },
  ]
}

export type CodeParameter<A extends string, E extends string, N extends string> =
  | CodeParameterGeneric
  | CodeParameter26<E, N>
  | CodeParameter54<A>
  | CodeParameter62
