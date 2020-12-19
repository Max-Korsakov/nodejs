import express, { Router } from 'express';
import { routeLogger, routeErrorHandler } from '../../utils';

import {
    createNewGroup,
    deleteGroup,
    receiveGroupById,
    getAllGroups,
    updateGroup
} from '../controllers/groups';

const groupRouter: Router = express.Router();

groupRouter.post('/', routeLogger(routeErrorHandler(createNewGroup)));
groupRouter.delete('/:id', routeLogger(routeErrorHandler(deleteGroup)));
groupRouter.get('/:id', routeLogger(routeErrorHandler(receiveGroupById)));
groupRouter.get('/', routeLogger(routeErrorHandler(getAllGroups)));
groupRouter.put('/:id', routeLogger(routeErrorHandler(updateGroup)));

export { groupRouter };
