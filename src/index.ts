import fs from 'fs';
import https from 'https';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import apiController from './controllers';
import logger from './utils/logger';

const app = express();

// Middleware
const corsWhiteList = require(`../config.${process.env.NODE_ENV}.json`)[
  'cors'
  ].map((origin: string) => origin.replace(/\/+$/, ''));
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);

      if (corsWhiteList.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

app.use(bodyParser.json());

// Controller
app.use('/api', apiController);

// HTTPS/SSL
const privateKey = fs.readFileSync('./ssl/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('./ssl/localhost.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

// Initialize server
const httpsServer = https.createServer(credentials, app);

const PORT = 8050;
httpsServer.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});

export default app;
