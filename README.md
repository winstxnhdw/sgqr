# sgqr

[![main.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/main.yml)
[![release.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/release.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/release.yml)
[![release.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/publish.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/publish.yml)
[![formatter.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/formatter.yml)

A web-compatible typesafe [SGQR](https://www.mas.gov.sg/development/e-payments/sgqr) library for individuals and businesses.

## Install

```bash
npm i sgqr
```

```bash
pnpm i sgqr
```

```bash
bun add sgqr
```

## Usage

### Generate SGQR

Minimally, `sgqr` allows you to generate the SGQR text.

```ts
import sgqr from 'sgqr'

const code = sgqr.generate({
  number: '+6591234567',
  amount: '1.69'
})

console.log(code)
```

### Generate SGQR Code

`sgqr` provides an API capable of generating QR codes in `webp`, `jpeg` or `png` formats.

```ts
import sgqr from 'sgqr'

const buffer = await sgqr.generate_code({
  number: '+6591234567',
  amount: '1',
  type: 'image/webp'
})

if (!buffer) {
  throw new Error('Failed to generate QR code')
}

await Bun.write('qr.png', buffer)
```

### Generate SGQR SVG

SVGs can be generated with the `generate_svg` API.

```ts
import sgqr from 'sgqr'

const buffer = await sgqr.generate_svg({
  number: '+6591234567',
  amount: '1',
  comments: 'This SGQR was made with sgqr!'
})

if (!buffer) {
  throw new Error('Failed to generate QR code')
}

await Bun.write('qr.svg', buffer)
```

### Generate SGQR with UEN

If you are a business, you can generate SGQR codes with your UEN.

```ts
import sgqr from 'sgqr'

const buffer = await sgqr.generate_code({
  number: '0123456789',
  number_type: 'UEN',
  company_name: 'Singapore Armed Forces',
  amount: '4',
  type: 'image/jpeg'
})

if (!buffer) {
  throw new Error('Failed to generate QR code')
}

await Bun.write('qr.png', buffer)
```

### Generate SGQR with Expiry Date

You can specify an expiry date for the SGQR code. According to the SGQR specification, the expiry date must be in the format `YYYYMMDD`.

```ts
import sgqr from 'sgqr'

const buffer = await sgqr.generate_svg({
  number: '0123456789',
  number_type: 'UEN',
  amount: '1.00',
  expiry_date: '20251231'
})

if (!buffer) {
  throw new Error('Failed to generate QR code')
}

await Bun.write('qr.svg', buffer)
```

You can also specify the number of days until the expiry date.

```ts
import sgqr from 'sgqr'

const buffer = await sgqr.generate_svg({
  number: '0123456789',
  number_type: 'UEN',
  amount: '1.00',
  days_before_expiry: 1
})

if (!buffer) {
  throw new Error('Failed to generate QR code')
}

await Bun.write('qr.svg', buffer)
```

### Command Line

`sgqr` can also be used as a command line tool. The binary can be found [here](https://github.com/winstxnhdw/sgqr/releases/tag/latest).

```bash
sgqr --number +6591234567 --amount 420.69 --type image/svg+xml --output qr.svg
```

```yml
Options:
  --version             Show version number                             [boolean]
  --number              mobile or unique entity number                  [string] [required]
  --amount              payment amount as a string                      [string] [required]
  --output              output file path                                [string] [required]
  --number_type         UEN or MOBILE                                   [string]
  --company_name        company name                                    [string]
  --comments            comments                                        [string]
  --country_code        country code                                    [string]
  --scale               scale of the image                              [number]
  --days_before_expiry  number of days until the expiry date            [number]
  --expiry_date         expiry date as a string                         [string]
  --merchant_city       merchant city                                   [string]
  --currency_code       currency code                                   [string]
  --type                type of image, either webp, jpeg or svg         [choices: "image/webp", "image/jpeg", "image/svg+xml"]
  --editable            if the code is editable                         [boolean]
  --help                Show help                                       [boolean]
```

## Development

### Setup

Install all dependencies.

```bash
bun install
```

### Build

Minify and bundle the library with [tsup](https://github.com/egoist/tsup).

```bash
bun run build
```

### Compile

Compile the library into a binary.

```bash
bun compile
```

### Test

Run your tests with hot reloading.

```bash
bun run test
```

Run your tests without hot reloading. For testing in a CI pipeline.

```bash
bun test
```
