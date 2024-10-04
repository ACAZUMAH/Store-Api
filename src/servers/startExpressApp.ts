import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import limiter from 'express-rate-limit';
import express, { Application } from 'express';
import errorHandler from '../middlewares/error-Handler';
import router from '../router';

const limiterOptions = limiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
})

const startExpressApp = async (): Promise<Application> =>{
    const app = express();
    app.set('trust proxy', 1);
    app.use(limiterOptions);
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(xss());
    app.use(router);

    app.use(errorHandler);

    app.all('*', (req, res) => {
        res.status(404).json({ message: 'Unable to find the requested resource!' });
    })

    return app;
};

export default startExpressApp;