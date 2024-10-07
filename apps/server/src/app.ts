import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import config from './app/config';
import path from 'path';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// application routes - base path
app.use('/api', router);

if (config.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
    });
} else if (config.NODE_ENV === 'development') {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, Developer...');
    });

    app.use(globalErrorHandler);

    //Not Found
    app.use(notFound);
}

export default app;
