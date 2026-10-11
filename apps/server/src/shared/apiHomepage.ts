import express, { Application } from 'express';
import path from 'node:path';

// The API and frontend deploy independently; serve the API landing page in both modes.
export function configureDevelopmentApp(app: Application) {
    const publicPath = path.resolve(__dirname, '../../public');
    app.use(express.static(publicPath));
    app.get('/', (_req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}

export const configureProductionApp = configureDevelopmentApp;
