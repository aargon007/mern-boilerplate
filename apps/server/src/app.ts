import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// application routes - base path
app.use('/api', router);

const home = async (req: Request, res: Response) => {
  res.send("wow! it's working");
};

app.get('/', home);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
