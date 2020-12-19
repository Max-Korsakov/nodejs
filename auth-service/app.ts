import express from 'express';

import { authRouter } from './api/routes';

const application = () => {
    const app: express.Application = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/', authRouter);

    return app;
};

export default application;
