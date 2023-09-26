import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import consoleLine from './plugin/index.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), consoleLine({ exclude: ['node_modules'] })],
})