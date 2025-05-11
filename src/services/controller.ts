import { ServerResponse } from 'http';
import { userData } from '../storage/user-storage';
import { getFilterUser, getValidateUserId } from '../utils/utils';

const getAllUsers = async (res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');
  res.write(JSON.stringify(userData));
  res.end();
  console.log('Send all users, status code 200');
};

const getOneUser = async (basePath: string, res: ServerResponse) => {
  const validate = await getValidateUserId(basePath);
  if (!validate) {
    res.statusCode = 400;
    console.log('invalid id');
    res.end('invalid id');
    return;
  }

  const findUser = await getFilterUser(userData, basePath);

  if (!findUser) {
    res.statusCode = 404;
    console.log('user doesn`t exist');
    res.end('user doesn`t exist');
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');

  console.log(findUser);
  res.end(JSON.stringify(findUser));
  return;
};

const notFound404 = async (res: ServerResponse) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/json');
  res.write('url path doesn`t exist');
  res.end();
  console.log('url path doesn`t exist');
};

export { getAllUsers, notFound404, getOneUser };
