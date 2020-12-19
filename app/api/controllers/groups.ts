import { Request, Response } from 'express';

import { errorHandler } from '../../utils';
import { BASES } from '../../constants';
import { getService, callService } from '../../utils';

const getAllGroups = async (req: Request, res: Response) => {
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'get',
            url: `http://${ip}:${port}/api/groups`
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const receiveGroupById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'get',
            url: `http://${ip}:${port}/api/groups/${id}`
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const createNewGroup = async (req: Request, res: Response) => {
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'post',
            url: `http://${ip}:${port}/api/groups`,
            data: req.body
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const updateGroup = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'put',
            url: `http://${ip}:${port}/api/groups/${id}`,
            data: req.body
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const deleteGroup = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'delete',
            url: `http://${ip}:${port}/api/groups/${id}`
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

export {
    getAllGroups,
    receiveGroupById,
    createNewGroup,
    deleteGroup,
    updateGroup
};
