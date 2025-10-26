import { Request, Response } from 'express';
import { getExample } from '../../db/examples';

const getExampleRoute = async (req: Request<{ uuid: string }, unknown, unknown>, res: Response) => {
  const example = getExample(req.params.uuid);
  return res.status(200).json({ example });
}

export default getExampleRoute;
