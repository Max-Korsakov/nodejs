import express from 'express';

import { userRouter, groupRouter } from './api/routes';

const application = () => {
    const app: express.Application = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/api/users', userRouter);
    app.use('/api/groups', groupRouter);

    return app;
};

export default application;
