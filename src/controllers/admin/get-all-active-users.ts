import { Request, Response } from 'express';

import { getActiveUsers } from '../../db/users';

const getAllActiveUsersRoute = async (req: Request, res: Response) => {
  const users = getActiveUsers();

  return res.status(200).json({ users });
};

export default getAllActiveUsersRoute;
