import { Request, Response } from 'express';
import generateUuid from '../../utils/uuid';
import { CreateExampleRequest } from './request/create';
import { createExample } from '../../db/examples';

const createExampleRoute = async (req: Request<unknown, unknown, CreateExampleRequest>, res: Response) => {
  const example = await createExample({
    uuid: generateUuid(),
    name: req.body.name,
    userUuid: res.locals.context.user.uuid,
  });
}

export default createExampleRoute;
