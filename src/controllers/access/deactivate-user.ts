import { Request, Response } from 'express';

import { deactivateUser } from '../../db/users';

const deactivateUserRoute = async (req: Request, res: Response) => {
  await deactivateUser(res.locals.context.user.uuid);

  return res.status(205).send();
};

export default deactivateUserRoute;
