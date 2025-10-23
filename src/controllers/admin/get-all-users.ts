import { Request, Response } from 'express';

import { getUsers } from '../../db/users';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await getUsers();

  return res.status(200).json({ users });
};

export default getAllUsers;
