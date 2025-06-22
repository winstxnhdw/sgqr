import type {
  Alphanumeric as AlphanumericGeneric,
  Amount as AmountGeneric,
  ExpiryDate as ExpiryDateGeneric,
  NumberString as NumberStringGeneric,
} from '@/types';

export { generate, generate_code, generate_svg } from '@/generate';
export type { CountryCode, CurrencyCode, DialingCode } from '@/types';
export type Alphanumeric = AlphanumericGeneric<string>;
export type NumberString = NumberStringGeneric<string>;
export type Amount = AmountGeneric<string>;
export type ExpiryDate = ExpiryDateGeneric<string>;
