import { v4 as uuidv4 } from 'uuid';

interface UserObject {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export const userData: UserObject[] = [
  {
    id: uuidv4(),
    username: 'Alex',
    age: 100,
    hobbies: ['sleep, game, walk, eat'],
  },
  {
    id: uuidv4(),
    username: 'Bob',
    age: 10,
    hobbies: ['dance'],
  },
  {
    id: uuidv4(),
    username: 'Barb',
    age: 40,
    hobbies: [],
  },
];
