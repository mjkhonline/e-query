import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [dts()],
    build: {
        manifest: true,
        minify: 'esbuild',
        reportCompressedSize: true,
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'e-query',
            fileName: 'index'
        }
    }
})
