import { ServerResponse } from 'http';
import { userData } from '../storage/user-storage';

const getAllUsers = async (res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');
  res.write(JSON.stringify(userData));
  res.end();
  console.log('Send all users, status code 200');
};

const notFound404 = async (res: ServerResponse) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/json');
  res.write('url path doesn`t exist');
  res.end();
  console.log('url path doesn`t exist');
};

export { getAllUsers, notFound404 };
