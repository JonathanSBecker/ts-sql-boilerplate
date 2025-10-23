import { Router } from 'express';

import deleteUserHardRoute from './delete-hard';
import getAllActiveUsersRoute from './get-all-active-users';
import getAllUsersRoute from './get-all-users';
import { adminAuth } from '../../middleware/auth/auth-handler';
import errorWrapper from '../../utils/error-wrapper';

const router = Router();

router.use(errorWrapper(adminAuth));

router.get('/users/', errorWrapper(getAllUsersRoute));
router.get('/users/active', errorWrapper(getAllActiveUsersRoute));
router.post('/users/:uuid/delete-hard', errorWrapper(deleteUserHardRoute));

export default router;
