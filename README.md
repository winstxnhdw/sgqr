# sgqr

[![main.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/main.yml)
[![release.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/release.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/release.yml)
[![release.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/publish.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/publish.yml)
[![formatter.yml](https://github.com/winstxnhdw/sgqr/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/sgqr/actions/workflows/formatter.yml)

A typesafe cross-platform SGQR library.

## Install

```bash
npm i sgqr
```

## Usage

### Generate SGQR

```ts
import sgqr from 'sgqr'

const code = sgqr.generate({
  number: '+6591234567',
  amount: '1.69',
})

console.log(code)
```

### Generate SGQR Code

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

### Command Line

`sgqr` can also be used as a command line tool.

```bash
sgqr --number +6591234567 --amount 420.69 --output qr.png
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
