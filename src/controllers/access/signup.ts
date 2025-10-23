import argon2 from 'argon2';
import { Request, Response } from 'express';

import { SignUpRequest } from './request/signup';
import { addNewUser } from '../../db/access';
import { getUserByEmail, getUserByUsernameInternal } from '../../db/users';
import BadRequestError from '../../error/BadRequestError';
import ConflictError from '../../error/ConflictError';
import User from '../../types/user';
import UserPreferences from '../../types/user-preferences';
import sendEmail from '../../utils/email';
import { encodeJWT } from '../../utils/jwt';
import logger from '../../utils/logger';
import { getNewSessionForUserAndDevice } from '../../utils/sessions';
import generateUuid from '../../utils/uuid';

const getWelcomeMessage = (name: string) => `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Welcome to the Platinum Lifestyle</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <p style="color: #000000; font-family: Arial, sans-serif">
          Hey ${name}!<br />
          Welcome to the Platinum Lifestyle,<br />
        </p>
    
        <p style="color: #000000; font-family: Arial, sans-serif">
          Our mission is to help people get the most out of themselves, and their lifestyles.<br />
        </p>
    
        <p style="color: #000000; font-family: Arial, sans-serif">
          You can use the app to track, plan, and schedule your tasks, workouts, meals, focuses, and stressors.<br />
          Login now at https://platinum.lifestyle<br />
        </p>
    
        <p style="color: #000000; font-family: Arial, sans-serif">
          Have suggestions? Send them to contact@platinum.lifestyle<br />
        </p>
    
        <p style="color: #000000; font-family: Arial, sans-serif">
          Cheers,<br />
          Platinum Support<br />
        </p>
        
        <p style="color: #000000; font-family: Arial, sans-serif">
          Platinum Lifestyle and PlatinumRain Staff will never ask you for your password.<br />
          This was an automated email, for assistance please contact support@platinum.lifestyle<br />
        </p>
      </body>
    </html>
    `;

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

  const hashedPassword = await argon2.hash(body.password);

  await addNewUser(user, preferences, hashedPassword);

  try {
    await sendEmail(
      user.email,
      'Welcome to the Platinum Lifestyle!',
      getWelcomeMessage(user.firstName),
    );
  } catch (e) {
    logger.error('Unable to send email', JSON.stringify(e));
  }

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
