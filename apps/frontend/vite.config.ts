import babel from '@rolldown/plugin-babel';
import { defineConfig, PluginOption } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        tailwindcss()
    ] as PluginOption[],
    resolve: {
        tsconfigPaths: true
    },
    server: {
        host: true,
        watch: {
            usePolling: true
        },
        strictPort: false,
        port: parseInt(process.env.VITE_PORT || '5173', 10)
    }
});
