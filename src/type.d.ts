import { Request } from 'express'
import User from './models/schema/User.schema'
import { TokenPayload } from './models/requests/user.request'

declare module 'express' {
  interface Request {
    user?: User
    decodedAuthorization?: TokenPayload
    decodedRefreshToken?: TokenPayload
    decodedEmailVerifyToken?: TokenPayload
    decodedAccessToken?: TokenPayload
    decodedForgotPasswordToken?: TokenPayload
  }
}
