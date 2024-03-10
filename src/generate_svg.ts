import { generate } from '@/generate'
import type { GenerateOptions } from '@/types'
import { toString } from 'qrcode'

export async function generate_svg(options: GenerateOptions): Promise<string | undefined> {
  const code = generate(options)

  if (!code) {
    return undefined
  }

  const svg_string = await toString(code, {
    type: 'svg',
    errorCorrectionLevel: 'H',
  })

  return svg_string
}
