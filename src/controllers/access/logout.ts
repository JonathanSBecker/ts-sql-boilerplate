import { Request, Response } from 'express';

import { invalidateSession } from '../../utils/sessions';

export const logoutRoute = async (req: Request, res: Response) => {
  await invalidateSession(res.locals.context.session.uuid);
  return res.status(205).send();
};

export default logoutRoute;
