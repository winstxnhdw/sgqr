import { generate } from '@/generate'
import type { GenerateOptions } from '@/types'
import { toString as qr_to_string } from 'qrcode'

export async function generate_svg<A extends string, E extends string, N extends string>(
  options: GenerateOptions<A, E, N>,
): Promise<string | undefined> {
  const code = generate(options)

  if (!code) {
    return undefined
  }

  const svg_string = await qr_to_string(code, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    color: { dark: '#941C80' },
  })

  return svg_string
}
