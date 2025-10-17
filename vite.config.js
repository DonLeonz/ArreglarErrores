import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true
        },
        proxy: {
            '/api/mangadex': {
                target: 'https://api.mangadex.org',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api\/mangadex/, '')
            }
        }
    }
})
