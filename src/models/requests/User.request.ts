import { JwtPayload } from 'jsonwebtoken'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenType } from '~/constants/enums'

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface verifyEmailReqBody {
  email_verify_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}

export interface LogoutReqBody {
  refreshToken: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}

export interface GetProfileReqParams {
  username: string
}

export interface FollowReqBody {
  follow_user_id: string
}

export interface UnFollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
}
