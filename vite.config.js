import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/socket.io': {
				target: 'http://back-simesero-production.up.railway.app',
				changeOrigin: true,
				ws: true
			}
		}
	},
	optimize: {
		brotli: true,
	},
	build: {
		minify: 'terser',
		rollupOptions: {
		plugins: [],
		},
		chunkSizeWarningLimit: 1000,
	},

});

// target: 'https://menu-didactico.up.railway.app',
