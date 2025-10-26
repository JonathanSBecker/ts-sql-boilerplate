import { Request, Response } from 'express';
import NotFoundError from '../../error/NotFoundError';
import { getExample } from '../../db/examples';

const deleteExampleRoute = async (req: Request<{ uuid: string }, unknown, unknown>, res: Response) => {
  const example = getExample(req.params.uuid);
  if (!example) throw new NotFoundError('Example not found');
  return res.status(205).send();
};

export default deleteExampleRoute;
