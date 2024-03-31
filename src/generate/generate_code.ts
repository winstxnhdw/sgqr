import { generate } from '@/generate'
import type { GenerateCodeOptions } from '@/types'
import { toDataURL } from 'qrcode'

export async function generate_code<A extends string, E extends string, N extends string>(
  options: GenerateCodeOptions<A, E, N>,
): Promise<Uint8Array | undefined> {
  const { type, scale = 100 } = options
  const code = generate(options)

  if (!code) {
    return undefined
  }

  const data_url = await toDataURL(code, {
    type: type,
    errorCorrectionLevel: 'H',
    scale: scale,
    rendererOpts: { quality: 1 },
    color: { dark: '#941C80' },
  })

  const base64 = data_url.split(',')[1]

  if (!base64) {
    return undefined
  }

  const binary = atob(base64)
  const length = binary.length
  const array = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    array[i] = binary.charCodeAt(i)
  }

  return array
}
