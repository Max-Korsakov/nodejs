import express, { Router } from 'express';
import { routeLogger, routeErrorHandler } from '../../utils';

import { login, register } from '../controllers/auth';

const authRouter: Router = express.Router();

authRouter.post('/login', routeLogger(routeErrorHandler(login)));
authRouter.post('/register', routeLogger(routeErrorHandler(register)));

export { authRouter };
