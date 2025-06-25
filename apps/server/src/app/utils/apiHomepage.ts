import express, { Application } from 'express';
import path from 'path';

// TODO: add api homepage for production. NEED TO FIX ROUTING
export function configureProductionApp(app: Application) {
    const frontendDistPath = path.join(__dirname, '../../../../frontend/dist');
    app.use(express.static(frontendDistPath));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(frontendDistPath, 'index.html'));
    });
}

// api homepage for development
export function configureDevelopmentApp(app: Application) {
    const publicPath = path.join(__dirname, "../../../" + 'public');

    app.use(express.static(publicPath));

    app.get('/', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}