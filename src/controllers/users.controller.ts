import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'
import { ObjectId } from 'mongodb'
import { url } from 'node:inspector'
import { UserVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import {
  ChangePasswordReqBody,
  FollowReqBody,
  ForgotPasswordReqBody,
  GetProfileReqParams,
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  UnFollowReqParams,
  UpdateMeReqBody,
  verifyEmailReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/requests/user.request'
import User from '~/models/schema/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

config()

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const { user } = req

  const user_id = user?._id as ObjectId
  const verify = user?.verify as UserVerifyStatus

  const result = await usersService.login({ user_id: user_id.toString(), verify })

  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    data: result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)

  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    data: result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refreshToken } = req.body

  const result = await usersService.logout(refreshToken)

  return res.json(result)
}

export const verifyEmailController = async (req: Request<ParamsDictionary, any, verifyEmailReqBody>, res: Response) => {
  const { user_id } = req.decodedEmailVerifyToken as TokenPayload

  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  // Đã verify rồi thì không báo lỗi, return về status OK với message đã verify thành công
  if (user.email_verify_token === '') {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await usersService.verifyEmail(user_id)

  return res.json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    data: result
  })
}

export const resendVerifyEmailController = async (req: Request, res: Response) => {
  const { user_id } = req.decodedAuthorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await usersService.resendVerifyEmail(user_id)

  return res.json(result)
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response
) => {
  const { _id, verify } = req.user as User

  const result = await usersService.forgotPassword({
    user_id: _id.toString(),
    verify
  })

  return res.json(result)
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response
) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decodedForgotPasswordToken as TokenPayload
  const { password } = req.body

  const result = await usersService.resetPassword(user_id, password)

  return res.json(result)
}

export const getMeController = async (req: Request, res: Response) => {
  const { user_id } = req.decodedAuthorization as TokenPayload

  const user = await usersService.getMe(user_id)

  return res.json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    data: user
  })
}

export const updateMeController = async (req: Request<ParamsDictionary, any, UpdateMeReqBody>, res: Response) => {
  const { user_id } = req.decodedAuthorization as TokenPayload
  const { body } = req
  const user = await usersService.updateMe(user_id, body)

  return res.json({
    message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
    data: user
  })
}

export const getProfileController = async (req: Request<GetProfileReqParams>, res: Response) => {
  const { username } = req.params
  const user = await usersService.getProfile(username)

  return res.json({
    message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
    data: user
  })
}

export const followController = async (req: Request<ParamsDictionary, any, FollowReqBody>, res: Response) => {
  const { user_id } = req.decodedAuthorization as TokenPayload
  const { follow_user_id } = req.body
  const result = await usersService.follow(user_id, follow_user_id)

  return res.json(result)
}

export const unFollowController = async (req: Request<UnFollowReqParams>, res: Response) => {
  const { user_id } = req.decodedAuthorization as TokenPayload
  const { user_id: unfollow_user_id } = req.params
  const result = await usersService.unFollow(user_id, unfollow_user_id)

  return res.json(result)
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decodedAuthorization as TokenPayload
  const { password } = req.body
  const result = await usersService.changePassword(user_id, password)

  return res.json(result)
}

export const loginWithGoogleController = async (req: Request, res: Response) => {
  const { code } = req.query

  const result = await usersService.loginWithGoogle(code as string)

  const urlRedirect = `${process.env.CLIENT_REDIRECT_CALLBACK}?access_token=${result.accessToken}&refresh_token=${result.refreshToken}&new_user=${result.newUser}&verify=${result.verify}`

  return res.redirect(urlRedirect)
}
