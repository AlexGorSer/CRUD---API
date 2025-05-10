import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, notFound404 } from './controller';
import url from 'node:url';
import path from 'node:path';

export const servicesController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  if (req.url) {
    const paths = path.parse(req.url.toString());
    console.log(req.url);
    console.log(paths);

    if (paths.base === 'users' && req.method === 'GET')
      return await getAllUsers(res);
    if (paths.dir === '/users' && req.method === 'GET')
      return await getAllUsers(res);

    await notFound404(res);
  }
};
