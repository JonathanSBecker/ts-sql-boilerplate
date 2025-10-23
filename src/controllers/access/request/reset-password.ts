import { check } from 'express-validator';

export const resetPasswordValidation = [
  check('newPassword')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage('Password must be at least 8 characters')
    .trim()
    .escape(),
];

export interface ResetPasswordRequest {
  newPassword: string;
}
