import type { Digit, NumberString } from '@/types';

export type Amount<A extends string> =
  | NumberString<A>
  | `${NumberString<A>}.${Digit}${Digit}`
  | `${NumberString<A>}.${Digit}`;
