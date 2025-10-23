import argon2 from 'argon2';
import { Request, Response } from 'express';

import { ResetPasswordRequest } from './request/reset-password';
import { updatePassword } from '../../db/credentials';
import { deleteResetRequest, getResetRequest } from '../../db/reset-requests';
import { getUser } from '../../db/users';
import ExpiredError from '../../error/ExpiredError';
import NotFoundError from '../../error/NotFoundError';
import SystemError from '../../error/SystemError';
import sendEmail from '../../utils/email';
import logger from '../../utils/logger';

const getPasswordResetMessage = (name: string) => `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Platinum Lifestyle - Password Reset</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <p style="color: #000000; font-family: Arial, sans-serif">
          Hey ${name}!<br />
        </p>

        <p style="color: #000000; font-family: Arial, sans-serif">
          We've updated your password!<br />
          Login now at https://platinum.lifestyle<br />
        </p>

        <p style="color: #000000; font-family: Arial, sans-serif">
          Think this was a mistake? Reach out to support@platinum.lifestyle<br />
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

const passwordResetRoute = async (
  req: Request<{ requestUuid: string }, unknown, ResetPasswordRequest>,
  res: Response,
) => {
  const resetRequest = await getResetRequest(req.params.requestUuid);

  if (!resetRequest) {
    throw new NotFoundError();
  }

  if (resetRequest.expiresAt.getTime() > new Date().getTime()) {
    throw new ExpiredError();
  }

  const user = await getUser(resetRequest.userUuid);

  if (!user) {
    // This is a 500 since theoretically if there's a valid password request but no valid user there
    // is likely a larger system issue.
    logger.crit(
      `Unable to find user for password reset request ${req.params.requestUuid}`,
    );
    throw new SystemError();
  }

  await updatePassword(user.uuid, await argon2.hash(req.body.newPassword));

  await deleteResetRequest(req.params.requestUuid);

  await sendEmail(
    user.email,
    'Platinum Lifestyle - Your password has been reset',
    getPasswordResetMessage(user.firstName),
  );

  return res.status(205).send();
};

export default passwordResetRoute;
