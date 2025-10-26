import { Router } from 'express';
import errorWrapper from '../../utils/error-wrapper';
import createExampleRoute from './create';
import { createExampleValidation } from './request/create';
import validateRequest from '../../middleware/validation/validate-request';
import deleteExampleRoute from './delete';
import getExamplesForUserRoute from './get-for-user';
import getExampleRoute from './get';

const router = Router();

router.post(
    '/',
    createExampleValidation,
    errorWrapper(validateRequest),
    errorWrapper(createExampleRoute));

router.delete('/:uuid', errorWrapper(deleteExampleRoute));

router.get('/', errorWrapper(getExamplesForUserRoute));

router.get('/:uuid', errorWrapper(getExampleRoute));

export default router;
