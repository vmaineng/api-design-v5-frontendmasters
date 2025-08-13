import type { Request, Response, NextFunction} from 'express' //import types

import { type ZodSchema, ZodError } from 'zod'

//validate body from payload

export const validateBody = (schema: ZodSchema) => { 
    return (req: Request, res: Response, next: NextFunction) => {
        try { 
            const validatedData = schema.parse(req.body)
            req.body = validatedData //reassign it back if valid data and if it is truthful
            next()
        }catch (e) { 
            if (e instanceof ZodError) { 
                return res.status(400).json({
                    error: 'Validation failed',
                    details: e.issues.map(err => ({
                        field: err.path.join("."),
                        message: err.message
                    }))
                })
            }
            next(e)
        }
    }
}

export const validateParams = (schema: ZodSchema) => { 
    return (req: Request, res: Response, next: NextFunction) => {
        try { 
            schema.parse(req.params) //params are always strings
            //anything in url is a string params = /:id
            //parseInt for IDs and have to do something different for UUIDs
            next()
        }catch (e) { 
            if (e instanceof ZodError) { 
                return res.status(400).json({
                    error: 'Invalid params',
                    details: e.issues.map(err => ({
                        field: err.path.join("."),
                        message: err.message
                    }))
                })
            }
            next(e)
        }
    }
}

export const validateQuery = (schema: ZodSchema) => { 
    return (req: Request, res: Response, next: NextFunction) => {
        try { 
            schema.parse(req.query) //query - use it in react; it is an object with query variables as keys
            next()
        }catch (e) { 
            if (e instanceof ZodError) { 
                return res.status(400).json({
                    error: 'Invalid query',
                    details: e.issues.map(err => ({
                        field: err.path.join("."),
                        message: err.message
                    }))
                })
            }
            next(e)
        }
    }
}