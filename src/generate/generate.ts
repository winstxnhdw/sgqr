import { crc16 } from '@/helpers';
import type {
  AdditionalConsumerData,
  CodeSpecification,
  DataObject,
  GenerateOptions,
  MerchantAccountInformation,
} from '@/types';

function pad_all(data: readonly DataObject[]): string[] {
  return data.map(({ id, value }) => `${id}${value.length.toString().padStart(2, '0')}${value}`);
}

export function generate<A extends string, E extends string, N extends string>(
  options: GenerateOptions<A, E, N>,
): string | undefined {
  const {
    number,
    amount,
    expiry_date = '20380119',
    number_type = 'MOBILE',
    merchant_name = '',
    comments = '',
    country_code = 'SG',
    merchant_city = 'Singapore',
    currency_code = '702',
    editable = false,
  } = options;

  const merchant_account_information: MerchantAccountInformation<E, N> = [
    { id: '00', value: 'SG.PAYNOW' },
    { id: '01', value: number_type === 'MOBILE' ? '0' : '2' },
    { id: '02', value: number },
    { id: '03', value: editable ? '1' : '0' },
    { id: '04', value: expiry_date },
  ];

  const additional_consumer_data_request: AdditionalConsumerData = [
    {
      id: '01',
      value: comments,
    },
  ];

  const data: CodeSpecification<A> = [
    { id: '00', value: '01' },
    { id: '01', value: '12' },
    { id: '26', value: pad_all(merchant_account_information).join('') },
    { id: '52', value: '0000' },
    { id: '53', value: currency_code },
    { id: '54', value: amount },
    { id: '58', value: country_code },
    { id: '59', value: merchant_name },
    { id: '60', value: merchant_city },
    { id: '62', value: pad_all(additional_consumer_data_request).join('') },
  ];

  const payload = pad_all(data);
  payload.push('6304');

  const joined_parts = payload.join('');
  const code = crc16(joined_parts);

  if (!code) {
    return undefined;
  }

  return `${joined_parts}${code}`;
}
