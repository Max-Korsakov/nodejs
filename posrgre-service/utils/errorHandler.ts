import { Response, Request } from "express";
import {simpleErrorLogger} from './index'

const errorHandler = (res: Response,req: Request, error: Error, status = 500) => {
    simpleErrorLogger(req, error)
    res.status(status).json({
        success: false,
        message: error.message ? error.message : error
    })
}

export const routeErrorHandler = (func: Function) =>async (req: Request, res: Response) => {
    try {
        await func(req, res);
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

export  {errorHandler}