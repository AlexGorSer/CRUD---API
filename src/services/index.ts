import { IncomingMessage, ServerResponse } from 'http';
import {
  getAllUsers,
  notFound404,
  getOneUser,
  postNewUser,
  updateUser,
} from './controller';
import path from 'node:path';

export const servicesController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  if (req.url) {
    const paths = path.parse(req.url.toString());
    // console.log(req.url);
    // console.log(paths);

    if (paths.dir === '/api' && paths.base === 'users' && req.method === 'GET')
      return await getAllUsers(res);
    if (paths.dir === '/api/users' && req.method === 'GET' && paths.base)
      return await getOneUser(paths.base, res);
    if (paths.dir === '/api' && paths.base === 'users' && req.method === 'POST')
      return await postNewUser(req, res);
    if (paths.dir === '/api/users' && req.method === 'PUT' && paths.base)
      return await updateUser(paths.base, req, res);

    await notFound404(res);
  }
};
