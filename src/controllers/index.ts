import { Request, Response, Router } from 'express';

import AccessController from './access';
import AdminController from './admin';
import UserController from './user';
import ExampleController from './example';
import { adminAuth } from '../middleware/auth/auth-handler';
import errorWrapper from '../utils/error-wrapper';

const apiController = Router();

apiController.use('/access', AccessController);

apiController.use('/admin', AdminController);

apiController.use('/users', UserController);

apiController.use('/examples', ExampleController);

// If this needs to be any more complex, separate it out
apiController.get(
  '/status',
  errorWrapper(adminAuth),
  errorWrapper(async (req: Request, res: Response) => {
    return res.status(200).json({
      report: {
        systemStatus: 'ok',
      },
    });
  }),
);

export default apiController;
