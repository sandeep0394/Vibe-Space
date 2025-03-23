import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";



// https://vitejs.dev/config/
export default defineConfig({
	define: {
		global: "window", // Make `global` available in the browser
	  },
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "https://vibe-space.onrender.com",
				changeOrigin: true,
			},
		},
	},
});