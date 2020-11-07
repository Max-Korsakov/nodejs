import { Response } from "express";

const errorHandler = (res: Response, error: Error, status = 500) => {
    res.status(status).json({
        success: false,
        message: error.message ? error.message : error
    })
}

export  {errorHandler}