import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/requests/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()

    console.log('ERRORS OBJECT =>>>', errorsObject)

    const entityError = new EntityError({ errors: {} })

    for (const key in errorsObject) {
      const { msg } = errorsObject[key]

      console.log('MSG =>>>', msg)

      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UN_PROCESSABLE_ENTITY) {
        return next(msg)
      }

      entityError.errors[key] = errorsObject[key]
    }

    // res.status(422).json({ errors: errorsObject })

    console.log('ENTITY ERROR =>>>', entityError)
    next(entityError)
  }
}
