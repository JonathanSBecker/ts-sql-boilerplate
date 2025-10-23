import { promisify } from 'node:util';

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import logger from './logger';

const sendEmail = async (
  targetEmail: string,
  subject: string,
  html: string,
) => {
  try {
    dotenv.config();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    const sendMailPromisified = promisify(transporter.sendMail).bind(
      transporter,
    );
    try {
      await sendMailPromisified({
        from: process.env.EMAIL,
        to: targetEmail,
        subject,
        html,
      });
    } catch (error) {
      logger.error(error);
    }
  } catch (e) {
    logger.error('Unable to send email.', e);
  }
};

export default sendEmail;
