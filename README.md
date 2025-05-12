CRUD API

Work in node v.22.14.0

- git clone https://github.com/AlexGorSer/CRUD---API.git

  - npm install
  - npm run start:dev for check one server on 4001 port this server for cluster
  - npm run start:balancer dev check server for req on start:dev
  - npm run start:prod for build and run clusters and load-balancer for production
  - npm run start:multi for check dev build clusters and load-balancer

- User object have
  - id: uuid type
  - username: string type
  - age: number type
  - hobbies: array of strings ["string one", "string tho", "..."]

Server has validate type of send nod valid json server send status code 400

- API endpoints
  - GET api/users is used to get all persons
  - GET api/users/{userId} for one user
  - POST api/users is used to create record about new user and store it in database
  - PUT api/users/{userId} is used to update existing user
  - DELETE api/users/{userId} is used to delete existing user from database
  -
