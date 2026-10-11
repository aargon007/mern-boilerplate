import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const envDir = fileURLToPath(new URL('../../', import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, envDir, '');
    return {
        envDir,
        plugins: [
            react(),
            babel({ presets: [reactCompilerPreset()] }),
            tailwindcss()
        ],
        resolve: { tsconfigPaths: true },
        server: {
            host: true,
            strictPort: true,
            port: Number(env.VITE_PORT || 5173),
            proxy: { '/api': `http://localhost:${env.PORT || 5001}` }
        },
        preview: {
            host: true,
            strictPort: true,
            port: 4173,
            proxy: { '/api': `http://localhost:${env.PORT || 5001}` }
        }
    };
});
