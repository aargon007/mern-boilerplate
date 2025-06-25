import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import cors from 'cors';
import path from 'path';

import config from './config';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { configureDevelopmentApp, configureProductionApp } from './app/utils/apiHomepage';

const app: Application = express();

// Middleware
app.use(express.json({ limit: '100mb', }));
app.use(cookieParser());
app.use(cors({
    origin: config.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(
    express.urlencoded({
        extended: true,
        limit: '100mb', // adjust as needed
        parameterLimit: 100000, // optional: boost URL-encoded param count
    })
);

// API Routes
app.use('/api/v1', router);

// Environment-specific configurations
if (config.NODE_ENV === 'production') {
    configureProductionApp(app);
} else if (config.NODE_ENV === 'development') {
    configureDevelopmentApp(app);
}

// Custom Not Found handler for API routes
app.use('/api/', (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
});

// Global Error Handler
app.use(globalErrorHandler);

// Custom Not Found handler for non-API routes
app.use((req: Request, res: Response) => {
    // Sends a custom not-found HTML page for API requests that don't match any route.
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'not-found.html'));
});

export default app;