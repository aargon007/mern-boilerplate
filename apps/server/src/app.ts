import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import config from './app/config';
import path from 'path';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Routes
app.use('/api', router);

// Environment-specific configurations
if (config.NODE_ENV === 'production') {
    configureProductionApp(app);
} else if (config.NODE_ENV === 'development') {
    configureDevelopmentApp(app);
}

// Custom Not Found handler for API routes
app.use('/api/*', (req: Request, res: Response) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'not-found.html'));
});

// Error handling
app.use(globalErrorHandler);

// Global Not Found handler
app.use((req: Request, res: Response) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'not-found.html'));
});

export default app;


// Helper functions for environment-specific configurations
function configureProductionApp(app: Application) {
    const frontendDistPath = path.join(__dirname, '../../frontend/dist');
    app.use(express.static(frontendDistPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendDistPath, 'index.html'));
    });
}

function configureDevelopmentApp(app: Application) {
    const publicPath = path.join(__dirname, '..', 'public');
    app.use(express.static(publicPath));

    app.get('/', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}
