import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import consoleLine from 'vite-plugin-console-line'

// https://vitejs.dev/config/
const port = 9528
const viteConfig = defineConfig({
  server: {
    port: port,
    open: true,
  },
  plugins: [consoleLine({ exclude: ['node_modules'] }), vue(),],
})
export default viteConfig
