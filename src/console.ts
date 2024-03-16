import { generate_code, generate_svg } from '@/generate'
import type { ConsoleGenerateCodeOptions, GenerateCodeOptions, GenerateOptions } from '@/types'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

async function parse_args(): Promise<ConsoleGenerateCodeOptions> {
  const args = await yargs(hideBin(Bun.argv))
    .option('number', {
      describe: 'mobile or unique entity number',
      type: 'string',
      demandOption: true,
    })
    .option('amount', {
      describe: 'payment amount as a string',
      type: 'string',
      demandOption: true,
    })
    .option('output', {
      describe: 'output file path',
      type: 'string',
      demandOption: true,
    })
    .option('number_type', {
      describe: 'UEN or MOBILE',
      choices: ['UEN', 'MOBILE'],
    })
    .option('merchant_name', {
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
    .option('scale', {
      describe: 'scale of the image',
      type: 'number',
    })
    .option('expiry_date', {
      describe: 'expiry date as a string',
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
    .option('type', {
      describe: 'type of image',
      choices: ['image/webp', 'image/jpeg', 'image/svg+xml'],
    })
    .option('editable', {
      describe: 'if the code is editable',
      type: 'boolean',
    })
    .help()
    .parse()

  return args as ConsoleGenerateCodeOptions
}

async function main() {
  const options = await parse_args()

  const buffer =
    options.type === 'image/svg+xml'
      ? await generate_svg(options as GenerateOptions<string, string, string>)
      : await generate_code(options as GenerateCodeOptions<string, string, string>)

  if (!buffer) {
    throw new Error('Failed to generate the QR code!')
  }

  await Bun.write(options.output, buffer)
}

void main()
