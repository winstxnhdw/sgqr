import type { Digit } from '@/types'

export type NumberString<T extends string, V = T> = T extends Digit
  ? V
  : T extends `${Digit}${infer R}`
    ? NumberString<R, V>
    : `0`
