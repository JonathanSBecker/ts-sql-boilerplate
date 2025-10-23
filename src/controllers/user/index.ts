import { Router } from 'express';

import { updateUserEmailValidation } from './request/update-email';
import { updateUserFirstNameValidation } from './request/update-first-name';
import { updateUserLastNameValidation } from './request/update-last-name';
import { updateUserPhoneNumberValidation } from './request/update-phone-number';
import { updateUserPreferenceReceiveEmailMarketingValidation } from './request/update-preference-receive-email-marketing';
import { updateUserPreferenceSessionLengthValidation } from './request/update-preference-session-length';
import { updateUserPreferenceStaySignedInValidation } from './request/update-preference-stay-signed-in';
import { updateUserPreferenceTermsAndConditionsAcceptedValidation } from './request/update-preference-terms-and-conditions-accepted';
import { updateUserPreferenceUseEmailMfaValidation } from './request/update-preference-use-email-mfa';
import { updateUserPreferenceUseSmsMfaValidation } from './request/update-preference-use-sms-mfa';
import { updateUserUsernameValidation } from './request/update-username';
import updateUserEmailRoute from './update-email';
import updateUserFirstNameRoute from './update-first-name';
import updateUserLastNameRoute from './update-last-name';
import updateUserPhoneNumberRoute from './update-phone-number';
import updateUserPreferenceReceiveEmailMarketingRoute from './update-preference-receive-email-marketing';
import updateUserPreferenceSessionLengthRoute from './update-preference-session-length';
import updateUserPreferenceStaySignedInRoute from './update-preference-stay-signed-in';
import updateUserPreferenceTermsAndConditionsAcceptedRoute from './update-preference-terms-and-conditions-accepted';
import updateUserPreferenceUseEmailMfaRoute from './update-preference-use-email-mfa';
import updateUserPreferenceUseSmsMfaRoute from './update-preference-use-sms-mfa';
import updateUserUsernameRoute from './update-username';
import { standardAuth } from '../../middleware/auth/auth-handler';
import checkPermissionsUser from '../../middleware/permissions/user';
import validateRequest from '../../middleware/validation/validate-request';
import errorWrapper from '../../utils/error-wrapper';

const router = Router();

// Middleware
router.use(errorWrapper(standardAuth));
router.use(errorWrapper(checkPermissionsUser));

// Update Routes
router.put(
  '/:uuid/username',
  updateUserUsernameValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserUsernameRoute),
);

router.put(
  '/:uuid/first-name',
  updateUserFirstNameValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserFirstNameRoute),
);

router.put(
  '/:uuid/last-name',
  updateUserLastNameValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserLastNameRoute),
);

router.put(
  '/:uuid/email',
  updateUserEmailValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserEmailRoute),
);

router.put(
  '/:uuid/phone-number',
  updateUserPhoneNumberValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserPhoneNumberRoute),
);

router.put(
  '/:uuid/preferences/stay-signed-in',
  updateUserPreferenceStaySignedInValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserPreferenceStaySignedInRoute),
);

router.put(
  '/:uuid/preferences/session-length',
  updateUserPreferenceSessionLengthValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserPreferenceSessionLengthRoute),
);

router.put(
  '/:uuid/preferences/terms-and-conditions-accepted',
  updateUserPreferenceTermsAndConditionsAcceptedValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserPreferenceTermsAndConditionsAcceptedRoute),
);

router.put(
  '/:uuid/preferences/use-sms-mfa',
  updateUserPreferenceUseSmsMfaValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserPreferenceUseSmsMfaRoute),
);

router.put(
  '/:uuid/preferences/use-email-mfa',
  updateUserPreferenceUseEmailMfaValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserPreferenceUseEmailMfaRoute),
);

router.put(
  '/:uuid/preferences/receive-email-marketing',
  updateUserPreferenceReceiveEmailMarketingValidation,
  errorWrapper(validateRequest),
  errorWrapper(updateUserPreferenceReceiveEmailMarketingRoute),
);

export default router;
