import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    minify: !options.watch,
    clean: true,
    dts: true,
  }
})
