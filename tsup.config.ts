import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    target: 'es2022',
    platform: 'browser',
    globalName: 'sgqr',
    minify: !options.watch,
    treeshake: true,
    clean: true,
    dts: true,
  }
})
