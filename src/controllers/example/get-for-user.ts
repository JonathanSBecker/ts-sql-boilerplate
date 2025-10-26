import { Request, Response } from 'express';
import { getExamplesForUser } from '../../db/examples';

const getExamplesForUserRoute = async (req: Request, res: Response) => {
  const examples = await getExamplesForUser(res.locals.context.user.uuid);
  return res.status(200).json({ examples });
}

export default getExamplesForUserRoute;
