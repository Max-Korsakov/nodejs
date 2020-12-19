import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { errorHandler } from '../../utils';
import { BASES } from '../../constants';
import { getService, callService } from '../../utils';
import { keys } from '../../config';

const login = async (req: Request, res: Response) => {
    try {
        const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
        const candidate = await callService({
            method: 'post',
            url: `http://${ip}:${port}/api/users/findbylogin`,
            data: req.body
        });
        const user = candidate[0];
        if (user) {
            // eslint-disable-next-line no-sync
            const passwordResult = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (passwordResult) {
                const token = jwt.sign(
                    {
                        login: user.login,
                        userId: user.id
                    },
                    keys.jwt,
                    { expiresIn: 60 * 60 }
                );
                res.status(200).json({
                    token: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message: 'Wrong password'
                });
            }
        } else {
            res.status(410).json({
                message: 'User not found'
            });
        }
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
        const candidate = await callService({
            method: 'post',
            url: `http://${ip}:${port}/api/users/findbylogin`,
            data: req.body
        });
        if (candidate.length) {
            res.status(409).json({
                message: 'User with that emeil already exist'
            });
        } else {
            // eslint-disable-next-line no-sync
            const salt = bcrypt.genSaltSync(10);
            // eslint-disable-next-line no-sync
            const password = bcrypt.hashSync(req.body.password, salt);
            res.status(200).json(password);
        }
    } catch (e) {
        errorHandler(res, req, e);
    }
};

export { login, register };
