interface UserObject {
  id?: string;
  username?: string;
  age?: number;
  hobbies?: string[] | [];
}

type POSTdata = Omit<UserObject, 'id'>;

const userData: UserObject[] = [
  {
    id: '9b283e59-1f0f-42ca-9d50-995c40c46e92',
    username: 'Alex',
    age: 100,
    hobbies: ['sleep, game, walk, eat'],
  },
  {
    id: '79133f83-625c-48d5-ad4d-cf2da8571144',
    username: 'Bob',
    age: 10,
    hobbies: ['dance'],
  },
  {
    id: '6893e9e0-a7b7-484f-a0de-0fc3d65923ed',
    username: 'Barb',
    age: 40,
    hobbies: [],
  },
];

export { userData, UserObject, POSTdata };
