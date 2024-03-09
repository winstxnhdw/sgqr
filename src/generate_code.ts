import { generate } from '@/generate'
import type { GenerateCodeOptions } from '@/types'
import { toDataURL } from 'qrcode'

export async function generate_code(options: GenerateCodeOptions): Promise<ArrayBuffer | undefined> {
  const code = generate(options)

  if (!code) {
    return undefined
  }

  const data_url = await toDataURL(code, {
    type: options.type,
    errorCorrectionLevel: 'H',
  })

  const base64 = data_url.split(',')[1]

  if (!base64) {
    return undefined
  }

  const binary = atob(base64)
  const length = binary.length
  const buffer = new ArrayBuffer(length)
  const view = new Uint8Array(buffer)

  for (let i = 0; i < length; i++) {
    view[i] = binary.charCodeAt(i)
  }

  return buffer
}
