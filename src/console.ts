import { generate_code } from '@/generate_code'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { GenerateCodeOptions } from './types/generate_option.js'

async function parse_args() {
  const args = await yargs(hideBin(Bun.argv))
    .option('amount', {
      describe: 'Amount as a string',
      type: 'string',
      demandOption: true,
    })
    .option('expiry_date', {
      describe: 'Expiry date as a string',
      type: 'string',
    })
    .option('company_name', {
      describe: 'Company name',
      type: 'string',
    })
    .option('comments', {
      describe: 'Comments',
      type: 'string',
    })
    .option('country_code', {
      describe: 'Country code',
      type: 'string',
    })
    .option('merchant_city', {
      describe: 'Merchant city',
      type: 'string',
    })
    .option('currency_code', {
      describe: 'Currency code',
      type: 'string',
    })
    .option('editable', {
      describe: 'If the code is editable',
      type: 'boolean',
    })
    .option('number', {
      describe: 'Number as a string, with leading + for mobile',
      type: 'string',
      demandOption: true,
    })
    .option('number_type', {
      describe: 'Type of number, either UEN or MOBILE',
      type: 'string',
    })
    .option('type', {
      describe: 'Type of image, either webp or jpeg',
      choices: ['image/webp', 'image/jpeg'],
    })
    .option('output', {
      describe: 'Output file',
      type: 'string',
      demandOption: true,
    })
    .help()
    .parse()

  return args
}

async function main() {
  const options = await parse_args()
  const buffer = await generate_code(options as GenerateCodeOptions)

  if (!buffer) {
    throw new Error('Failed to generate the QR code!')
  }

  await Bun.write(options.output, buffer)
}

void main()
