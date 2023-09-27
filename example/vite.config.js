import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import consoleLine from '../src/index'

// https://vitejs.dev/config/
const port = 9528
const viteConfig = defineConfig({
  server: {
    port: port,
    open: true,
  },
  plugins: [consoleLine({ exclude: ['node_modules'], port: 9528 }), vue(),],
})
export default viteConfig
