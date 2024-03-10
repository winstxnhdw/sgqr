import { generate } from '@/generate'
import type { GenerateOptions } from '@/types'
import { toString } from 'qrcode'

export async function generate_svg<A extends string, E extends string, N extends string>(
  options: GenerateOptions<A, E, N>,
): Promise<string | undefined> {
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
