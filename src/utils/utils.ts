import { ServerResponse } from 'http';
import { POSTdata, UserObject } from 'storage/user-storage';
import { validate as uuidValidate } from 'uuid';

const getFilterUser = async (userArr: UserObject[], userId: string) => {
  const findUser = userArr.find((data) => {
    return data.id === userId;
  });
  return findUser;
};

const getValidateUserId = async (userId: string) => {
  const validate = uuidValidate(userId);
  return validate;
};

const validNewUser = async (jsonString: string, res: ServerResponse) => {
  const data: POSTdata = JSON.parse(jsonString);

  if (typeof data.username !== 'string') {
    res.statusCode = 400;
    res.end('username must be a string type');
    return;
  }

  if (typeof data.age !== 'number') {
    res.statusCode = 400;
    res.end('age must be a number type');
    return;
  }

  if (Array.isArray(data.hobbies)) {
    data.hobbies.forEach((elem) => {
      if (typeof elem !== 'string') {
        res.statusCode = 400;
        res.end('hobbies must contain only string type');
        throw new Error('hobbies must contain only string type');
      }
    });
    console.log(data);
  } else {
    res.statusCode = 400;
    res.end('hobbies must be an array type');
    return;
  }
  return data;
};

const updateOldUser = async (
  oldData: UserObject,
  newData: UserObject,
  res: ServerResponse,
) => {
  if (newData.age && typeof newData.age === 'number') {
    oldData.age = newData.age;
  } else {
    res.statusCode = 400;
    res.end('age must be number type');
    return;
  }
  if (newData.username && typeof newData.username === 'string') {
    oldData.username = newData.username;
  } else {
    res.statusCode = 400;
    res.end('username must be string type');
    return;
  }
  if (newData.hobbies && Array.isArray(newData.hobbies)) {
    newData.hobbies.forEach((elem) => {
      if (typeof elem !== 'string') {
        res.statusCode = 400;
        res.end('hobbies must contain only string type');
        throw new Error('hobbies must contain only string type');
      }
    });

    const data = oldData.hobbies;
    oldData.hobbies = [...newData.hobbies, ...(data ?? [])];
  }
};

export { getFilterUser, getValidateUserId, validNewUser, updateOldUser };
