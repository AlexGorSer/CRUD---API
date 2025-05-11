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
        return;
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

export { getFilterUser, getValidateUserId, validNewUser };
