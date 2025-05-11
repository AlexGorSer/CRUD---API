import { ServerResponse, IncomingMessage } from 'http';
import { userData, UserObject } from '../storage/user-storage';
import {
  getFilterUser,
  getValidateUserId,
  updateOldUser,
  validNewUser,
} from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';

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

const postNewUser = async (req: IncomingMessage, res: ServerResponse) => {
  let jsonData: string = '';
  req.on('data', async (chunk) => {
    jsonData += chunk.toString();

    try {
      const data = await validNewUser(jsonData, res);
      if (data) {
        const { username, age, hobbies } = data;
        userData.push({ id: uuidv4(), username, age, hobbies });
      }
    } catch {
      res.statusCode = 400;
      res.end('incorrect json request');
    }
  });
  req.on('end', () => {
    res.statusCode = 201;
    res.end('POST');
  });
};
const updateUser = async (
  basePath: string,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const validate = await getValidateUserId(basePath);
  if (!validate) {
    res.statusCode = 400;
    console.log('invalid id');
    res.end('invalid id');
    return;
  }

  const oldData = await getFilterUser(userData, basePath);

  if (!oldData) {
    res.statusCode = 404;
    console.log('user doesn`t exist');
    res.end('user doesn`t exist');
    return;
  }

  let jsonData: string = '';

  req.on('data', async (chunk) => {
    jsonData += chunk.toString();

    try {
      const newData: UserObject = JSON.parse(jsonData);
      if (newData) {
        await updateOldUser(oldData, newData, res);
      }
    } catch {
      res.statusCode = 400;
      res.end('incorrect json request');
    }
  });

  req.on('end', () => {
    res.statusCode = 200;
    res.end('PUT');
  });
};

const deleteUser = async (basePath: string, res: ServerResponse) => {
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

  const index = userData.findIndex((elem) => elem.id === findUser.id);
  userData.splice(index, 1);

  res.statusCode = 204;
  res.end('DELETE');
};

export {
  getAllUsers,
  notFound404,
  getOneUser,
  postNewUser,
  updateUser,
  deleteUser,
};
