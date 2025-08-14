import type { NextFunction, Request,Response } from "express";
import {env } from '../../env.ts'

//could make an APIError that extends Error

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => { 
    console.log(err.stack) //logging stack trace
    //after this this is opinion based
    //logging to Pino, writing to a file, sending a slack to a person = how to send off error
    //if you don't handle the error, the server will break

    let status = err.status || 500
    let message = err.message || 'Internal server error'

    if (err.name === 'ValidationError') { 
        status = 400
        message = 'Validation Error'
    }

    if (err.name === 'UnauthorizedError') { 
        status = 401
        message: 'Unauthorized'
    }

    return res.status(status).json({ 
        error: message,
        ...err(env.APP_STAGE === 'dev' &&  { 
            stack: err.stack,
            details: err.message,
        })
    })
}