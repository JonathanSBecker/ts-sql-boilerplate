import argon2id from 'argon2';
import { Request, Response } from 'express';

import { SignUpRequest } from './request/signup';
import { addNewUser } from '../../db/access';
import { getUserByEmail, getUserByUsernameInternal } from '../../db/users';
import BadRequestError from '../../error/BadRequestError';
import ConflictError from '../../error/ConflictError';
import User from '../../types/user';
import UserPreferences from '../../types/user-preferences';
import { encodeJWT } from '../../utils/jwt';
import { getNewSessionForUserAndDevice } from '../../utils/sessions';
import generateUuid from '../../utils/uuid';

/**
 * @api {post} /v2/access/signup Signup
 * @apiName Signup
 * @apiGroup Access
 * @apiPermission none
 *
 * @apiParam {String} email Users unique email.
 * @apiParam {String} [username] Users unique username.
 * @apiParam {String} firstName Users first name.
 * @apiParam {String} lastName Users last name.
 * @apiParam {String} password Users password.
 * @apiParam {String} userType Type of the user.
 * @apiParam {String} [phoneNumber] Users contact number.
 * @apiParam {String[]} [languages] Users preferred languages.
 * @apiParam {String[]} careerInterestIds Users career interests.
 * @apiParam {Object} preferences User preferences like staySignedIn, termsAndConditionsAccepted,
 * receiveSmsNewsletter, receiveEmailNewsletter, and useMfa.
 * @apiParam {String} referralSource Referral source of the user.
 * @apiParam {String} [dreamJobDescription] Dream job description of the user.
 * @apiParam {String} [birthday] Birthday of the user.
 * @apiParam {String} [companyName] Company name of the user.
 * @apiParam {String} [title] Title of the user.
 * @apiParam {Object} [hostData] Host verification data containing front and back photo of the license.
 *
 * @apiSuccess {Object} user User's data.
 * @apiSuccess {String} jwt JSON Web Token (JWT) which to be used for the subsequents API calls.
 *
 * @apiError BadRequestError The request can't be processed due to client errors (status code 400).
 * @apiError ConflictError The request can't be processed because of conflict in the current state (status code 409).
 */
export default async function signupRoute(
  req: Request<unknown, unknown, SignUpRequest>,
  res: Response,
) {
  const body = req.body;
  if (await getUserByEmail(body.email)) {
    throw new ConflictError('Email address already exists');
  }

  if (await getUserByUsernameInternal(body.username)) {
    throw new ConflictError('Username already exists');
  }

  if (!req.headers.deviceuuid || req.headers.deviceuuid instanceof Array) {
    throw new BadRequestError("Header 'deviceuuid' is required");
  }

  if (!req.headers.utcoffset || req.headers.utcoffset instanceof Array) {
    throw new BadRequestError("Header 'utcoffset' is required");
  }

  const user: User = {
    uuid: generateUuid(),
    username: body.username,
    usernameInternal: body.username.toLowerCase(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phoneNumber: body.phoneNumber,
    birthday: body.birthday,
    isActive: true,
    isStaff: false,
    isDeveloper: false,
  };

  const preferences: UserPreferences = {
    userUuid: user.uuid,
    staySignedIn: !!body.staySignedIn,
    sessionLength: 6,
    termsAndConditionsAccepted: !!body.termsAndConditionsAccepted,
    useSmsMfa: !!body.useSmsMfa,
    useEmailMfa: !!body.useEmailMfa,
    receiveEmailMarketing: !!body.receiveEmailMarketing,
    language: body.language,
    timezone: body.timezone,
  };

  user.preferences = preferences;

  const hashedPassword = await argon2id.hash(body.password);

  await addNewUser(user, preferences, hashedPassword);

  const session = await getNewSessionForUserAndDevice(
    user.uuid,
    req.headers.deviceuuid as string,
  );
  const jwt = await encodeJWT(session.uuid);

  return res.status(201).json({
    user: user,
    jwt,
  });
}
