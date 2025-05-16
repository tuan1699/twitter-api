import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapRequestHandler = <P>(callback: RequestHandler<P>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    try {
      callback(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
