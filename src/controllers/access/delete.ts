import { Request, Response } from 'express';

import { deleteUser } from '../../db/users';

const deleteUserRoute = async (req: Request, res: Response) => {
  await deleteUser(res.locals.context.user.uuid);

  return res.status(205).send();
};

export default deleteUserRoute;
