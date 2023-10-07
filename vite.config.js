import {
    defineConfig
} from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: false,
        outDir: 'lib',
        lib: {
            name: 'form-render4-vue3-pro',
            entry: path.resolve(__dirname, './src/index.js'),
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['path-browserify']
        },

    },
    optimizeDeps: {
        include: ['index', 'utils']
    }
})
