# sgqr

[![npm version](https://badge.fury.io/js/sgqr.svg)](https://www.npmjs.com/package/sgqr)
[![main.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/main.yml)
[![release.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/release.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/release.yml)
[![release.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/publish.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/publish.yml)
[![formatter.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/formatter.yml)

A web-compatible typesafe [SGQR](https://www.mas.gov.sg/development/e-payments/sgqr) library for individuals and businesses.

> [!IMPORTANT]\
> `sgqr` is still a work-in-progress and may undergo drastic API changes to maximise DX and performance. See the following [discussion](https://github.com/winstxnhdw/sgqr/discussions/28) for more information.

## Install

You can depend on `sgqr` from `npm` or via CDN.

### Node

```bash
npm i sgqr
```

```bash
bun add sgqr
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/sgqr/dist/index.global.js"></script>
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
const data = await sgqr.generate_code({
  number: '+6591234567',
  amount: '1',
  type: 'image/webp'
})

if (!data) {
  throw new Error('Failed to generate QR code')
}

await Bun.write('qr.png', data)
```

### Generate SGQR SVG

SVGs can be generated with the `generate_svg` API.

```ts
const data = await sgqr.generate_svg({
  number: '+6591234567',
  amount: '1.2',
  comments: 'This SGQR was made with sgqr!'
})
```

### Generate SGQR with UEN

If you are a business, you can generate SGQR codes with your UEN.

```ts
const data = await sgqr.generate_code({
  number: '0123456789',
  number_type: 'UEN',
  merchant_name: 'Singapore Armed Forces',
  amount: '4.1',
  type: 'image/jpeg'
})
```

### Generate SGQR with Expiry Date

You can specify an expiry date for the SGQR code. According to the SGQR specification, the expiry date must be in the format `YYYYMMDD`.

```ts
const data = await sgqr.generate_svg({
  number: '0123456789',
  number_type: 'UEN',
  amount: '1.00',
  expiry_date: '20251231'
})

if (!data) {
  throw new Error('Failed to generate QR code')
}

await Bun.write('qr.svg', data)
```

### Command Line

`sgqr` can also be used as a command line tool. The binary can be found [here](https://github.com/winstxnhdw/sgqr/releases/tag/latest).

```bash
sgqr --number +6591234567 --amount 420.69 --type image/svg+xml --output qr.svg
```

```yml
Options:
  --version             Show version number             [boolean]
  --number              mobile or unique entity number  [string] [required]
  --amount              payment amount as a string      [string] [required]
  --output              output file path                [string]
  --number_type         UEN or MOBILE                   [choices: "UEN", "MOBILE"]
  --merchant_name       merchant name                   [string]
  --comments            comments                        [string]
  --country_code        country code                    [string]
  --scale               scale of the image              [number]
  --expiry_date         expiry date as a string         [string]
  --merchant_city       merchant city                   [string]
  --currency_code       currency code                   [string]
  --type                type of image                   [choices: "image/webp", "image/jpeg", "image/svg+xml"]
  --editable            if the code is editable         [boolean]
  --help                Show help                       [boolean]
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
