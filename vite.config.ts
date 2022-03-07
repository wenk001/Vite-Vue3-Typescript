import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  css:{
    preprocessorOptions:{
      less:{
        chatset: false,
        additionalData: '@import "@/assets/style/global.less";'
      }
    }
  },
  server: {
    https: false,
    open: false,
    port: 3000,
    proxy:{
      '/api': {
        target: 'http://192.168.1.51:8085',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
