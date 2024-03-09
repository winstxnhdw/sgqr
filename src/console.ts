import { generate_code } from '@/generate_code'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generate_svg } from './generate_svg.js'
import { GenerateCodeOptions } from './types/generate_option.js'

async function parse_args() {
  const args = await yargs(hideBin(Bun.argv))
    .option('amount', {
      describe: 'payment amount as a string',
      type: 'string',
      demandOption: true,
    })
    .option('expiry_date', {
      describe: 'expiry date as a string',
      type: 'string',
    })
    .option('company_name', {
      describe: 'company name',
      type: 'string',
    })
    .option('comments', {
      describe: 'comments',
      type: 'string',
    })
    .option('country_code', {
      describe: 'country code',
      type: 'string',
    })
    .option('merchant_city', {
      describe: 'merchant city',
      type: 'string',
    })
    .option('currency_code', {
      describe: 'currency code',
      type: 'string',
    })
    .option('editable', {
      describe: 'if the code is editable',
      type: 'boolean',
    })
    .option('number', {
      describe: 'mobile or unique entity number',
      type: 'string',
      demandOption: true,
    })
    .option('number_type', {
      describe: 'UEN or MOBILE',
      type: 'string',
    })
    .option('scale', {
      describe: 'scale of the image',
      type: 'number',
    })
    .option('type', {
      describe: 'type of image, either webp, jpeg or svg',
      choices: ['image/webp', 'image/jpeg', 'image/svg+xml'],
    })
    .option('output', {
      describe: 'output file path',
      type: 'string',
      demandOption: true,
    })
    .help()
    .parse()

  return args
}

async function main() {
  const options = await parse_args()

  const buffer =
    options.type === 'image/svg+xml'
      ? await generate_svg(options as GenerateCodeOptions)
      : await generate_code(options as GenerateCodeOptions)

  if (!buffer) {
    throw new Error('Failed to generate the QR code!')
  }

  await Bun.write(options.output, buffer)
}

void main()
