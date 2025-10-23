import { Router } from 'express';

import deactivateUserRoute from './deactivate-user';
import deleteUserRoute from './delete';
import invalidateSessionsRoute from './invalidate-sessions';
import loginRoute from './login';
import logoutRoute from './logout';
import { loginValidation } from './request/login';
import { resetPasswordValidation } from './request/reset-password';
import { resetPasswordRequestValidation } from './request/reset-password-request';
import { signupValidation } from './request/signup';
import { updatePasswordValidation } from './request/update-password';
import resetPasswordRoute from './reset-password';
import requestPasswordResetRoute from './reset-password-request';
import signupRoute from './signup';
import updatePasswordRoute from './update-password';
import { standardAuth } from '../../middleware/auth/auth-handler';
import validateRequest from '../../middleware/validation/validate-request';
import errorWrapper from '../../utils/error-wrapper';

const router = Router();

router.post('/invalidate-sessions', errorWrapper(invalidateSessionsRoute));

router.post(
  '/login',
  loginValidation,
  errorWrapper(validateRequest),
  errorWrapper(loginRoute),
);

router.post('/logout', errorWrapper(standardAuth), errorWrapper(logoutRoute));

router.post(
  '/reset-password/:requestUuid',
  resetPasswordValidation,
  errorWrapper(validateRequest),
  errorWrapper(resetPasswordRoute),
);

router.post(
  '/reset-password-request',
  resetPasswordRequestValidation,
  errorWrapper(validateRequest),
  errorWrapper(requestPasswordResetRoute),
);

router.post(
  '/signup',
  signupValidation,
  errorWrapper(validateRequest),
  errorWrapper(signupRoute),
);

router.post(
  '/update-password',
  errorWrapper(standardAuth),
  updatePasswordValidation,
  errorWrapper(validateRequest),
  errorWrapper(updatePasswordRoute),
);

router.delete(
  '/deactivate',
  errorWrapper(standardAuth),
  errorWrapper(deactivateUserRoute),
);

router.delete('/', errorWrapper(standardAuth), errorWrapper(deleteUserRoute));

export default router;
