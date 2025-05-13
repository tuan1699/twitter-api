import { Router } from 'express'
import {
  registerController,
  loginController,
  logoutController,
  verifyEmailController
} from '~/controllers/users.controller'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handles'

const usersRoutes = Router()

/**
 * Description: Login
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
usersRoutes.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: Logout
 * Path: /logout
 * Method: POST
 * Body: { refresh_token: string }
 */
usersRoutes.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: Verify email when user client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: { email_verify_token: string }
 */
usersRoutes.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO08601}
 */

usersRoutes.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRoutes
