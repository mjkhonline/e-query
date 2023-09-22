import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [
        dts({
            compilerOptions: './tsconfig.json'
        }),

        eslint()
    ],
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
