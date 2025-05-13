import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapRequestHandler = (callback: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      callback(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
