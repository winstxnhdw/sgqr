export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type StringNumber<T extends string, V = T> = T extends Digit
  ? V
  : T extends `${Digit}${infer R}`
    ? StringNumber<R, V>
    : `0`
