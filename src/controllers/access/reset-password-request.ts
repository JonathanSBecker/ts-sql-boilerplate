import { Request, Response } from 'express';

import { RequestPasswordResetRequest } from './request/reset-password-request';
import { addResetRequest } from '../../db/reset-requests';
import { getUserByEmail } from '../../db/users';
import SystemError from '../../error/SystemError';
import sendEmail from '../../utils/email';
import generateUuid from '../../utils/uuid';

const getRequestPasswordResetRequestEmail = (
  resetUuid: string,
  name: string,
) => `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Platinum Rain Password Reset Request</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <p style="color: #000000; font-family: Arial, sans-serif">
          Hey ${name}!<br />
          We received your password reset request,<br />
        </p>

        <p style="color: #000000; font-family: Arial, sans-serif">
          <a href="https://platinum.lifestyle/reset-password/${resetUuid}">Click here to reset your password.</a><br />
          This link will expire in 10 minutes.
        </p>

        <p style="color: #000000; font-family: Arial, sans-serif">
          NO ACTION IS REQUIRED IF YOU DID NOT MAKE THIS REQUEST.<br />
        </p>

        <p style="color: #000000; font-family: Arial, sans-serif">
          PlatinumRain and Platinum Lifestyle Staff will never ask you for your password.<br />
          This was an automated email, for assistance please contact support@pt-rain.com<br />
        </p>
      </body>
    </html>
    `;

const requestPasswordResetRoute = async (
  req: Request<unknown, unknown, RequestPasswordResetRequest>,
  res: Response,
) => {
  const user = await getUserByEmail(req.body.email);

  if (!user) {
    // Send the same ack regardless, to obfuscate against attacks
    return res.status(204).send();
  }

  const requestUuid = generateUuid();

  await addResetRequest(requestUuid, user.uuid);

  try {
    await sendEmail(
      req.body.email,
      'Platinum Lifestyle - Password Reset Request',
      getRequestPasswordResetRequestEmail(requestUuid, user.firstName),
    );
  } catch (error) {
    throw new SystemError('Failed to send password reset email');
  }

  return res.status(204).send();
};

export default requestPasswordResetRoute;
