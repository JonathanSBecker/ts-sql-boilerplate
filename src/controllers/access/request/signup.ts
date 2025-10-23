import { check } from 'express-validator';

export interface SignUpRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  language: string;
  staySignedIn: boolean;
  termsAndConditionsAccepted: boolean;
  useSmsMfa: boolean;
  useEmailMfa: boolean;
  receiveEmailMarketing: boolean;
  birthday: string;
  referralSource: string;
  timezone: string;
}

export const signupValidation = [
  check('email').isEmail().withMessage('Must be a valid email').trim().escape(),
  check('username').isLength({ min: 1 }).trim().escape(),
  check('firstName')
    .exists()
    .withMessage('First name is required')
    .trim()
    .escape(),
  check('lastName')
    .exists()
    .withMessage('Last name is required')
    .trim()
    .escape(),
  check('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be at least 8 characters, contain an upper and lower letter, a number, and a special character',
    )
    .trim(),
  check('phoneNumber')
    .isMobilePhone('any')
    .withMessage('Must be a valid phone number')
    .trim()
    .escape(),
  check('language')
    .exists()
    .withMessage('Language is required')
    .trim()
    .escape(),
  check('staySignedIn')
    .isBoolean()
    .withMessage('Check sign in status')
    .trim()
    .escape(),
  check('termsAndConditionsAccepted')
    .isBoolean()
    .withMessage('Terms and conditions acceptance indicator required'),
  check('useSmsMfa')
    .isBoolean()
    .withMessage('SMS preference indicator required'),
  check('useEmailMfa')
    .isBoolean()
    .withMessage('Email marketing preference indicator required'),
  check('receiveEmailMarketing')
    .isBoolean()
    .withMessage('Email marketing preference indicator required'),
  check('birthday')
    .custom(date => {
      const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d{2}$/;
      return regex.test(date);
    })
    .trim()
    .escape(),
  check('referralSource').optional().trim().escape(),
  check('timezone').optional().trim().escape(),
];
