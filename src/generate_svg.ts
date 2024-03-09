import { generate } from '@/generate'
import type { GenerateCodeOptions } from '@/types'
import { toString } from 'qrcode'

export async function generate_svg(options: GenerateCodeOptions): Promise<string | undefined> {
  const code = generate(options)

  if (!code) {
    return undefined
  }

  const svg_string = await toString(code, {
    type: 'svg',
    errorCorrectionLevel: 'H',
  })

  console.log(svg_string)

  return svg_string
}
