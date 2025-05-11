import { UserObject } from 'storage/user-storage';
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

export { getFilterUser, getValidateUserId };
