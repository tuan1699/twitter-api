export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation Error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100 charaters',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  USER_NOT_FOUND: 'User not found',
  EMAIL_OR_PASSWORD_INCORRECT: 'Email or password is incorrect',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50 characters',
  PASSWORD_MUST_BE_STRONG: 'Password must be strong',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50 characters',
  CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm password must be strong',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Password comfirmation does not match password',
  DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth muse be ISO8601',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register successfully',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Refresh token is used or does not exist',
  LOGOUT_SUCCESS: 'Logout success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_VERIFY_TOKEN_IS_INVALID: 'Email verify token is invalid',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify successfully',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email successfully',
  EMAIL_IS_INCORRECT: 'Email is incorrect',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Forgot password token is invalid',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password successfully',
  RESET_PASSWORD_SUCCESS: 'Reset password successfully',
  GET_ME_SUCCESS: 'Get me profile successfully',
  USER_NOT_VERIFIED: 'User is not verified',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_FROM_1_TO_200: 'Bio length must be from 1 to 200 characters',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_FROM_1_TO_200: 'Location length must be from 1 to 200 characters',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_MUST_BE_A_URL: 'Website must be a URL',
  WEBSITE_LENGTH_MUST_BE_FROM_1_TO_200: 'Website length must be from 1 to 200 characters',
  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Username length must be from 1 to 50 characters',
  IMAGE_URL_MUST_BE_A_STRING: 'Image URL must be a string',
  IMAGE_URL_MUST_BE_A_URL: 'Image URL must be a URL',
  IMAGE_URL_LENGTH_MUST_BE_FROM_1_TO_400: 'Image URL length must be from 1 to 400 characters',
  UPDATE_ME_SUCCESS: 'Update me successfully',
  GET_PROFILE_SUCCESS: 'Get profile successfully',
  FOLLOW_SUCCESS: 'Follow successfully',
  FOLLOW_USER_ID_IS_INVALID: 'Follow user id is invalid',
  FOLLOW_ALREADY_EXIST: 'Follow already exist',
  UNFOLLOW_SUCCESS: 'Unfollow successfully',
  USER_ID_IS_INVALID: 'User id is invalid',
  USERNAME_IS_INVALID:
    'Username must be 4-15 characters, no number at the beginning, contain only letters, numbers and underscores',
  OLD_PASSWORD_NOT_MATCH: 'Old password not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password successfully',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  GOOGLE_MAIL_NOT_VERIFIED: 'Google mail not verified',
  GOOGLE_LOGIN_SUCCESS: 'Google login successfully',
  UPLOAD_SUCCESS: 'Upload successfully',
  REFRESH_TOKEN_SUCCESS: 'Refresh token successfully'
} as const
