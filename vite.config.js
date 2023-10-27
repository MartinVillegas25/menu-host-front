import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/socket.io': {
				target: 'http://menu-host-back-production.up.railway.app',
				changeOrigin: true,
				ws: true
			}
		}
	}
});

// target: 'https://menu-didactico.up.railway.app',
