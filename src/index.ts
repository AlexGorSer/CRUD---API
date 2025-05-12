import 'dotenv/config';
import http from 'http';
import 'dotenv/config';

import { servicesController } from './services/index';

const server = http.createServer(async (request, response) => {
  try {
    await servicesController(request, response);
  } catch (err) {
    {
      console.log(err);
    }
    response.statusCode = 500;
    response.write('Error from server, status code 500');
    response.end();
  }
});

server.listen(process.env.PORT, () => {
  console.log(`server start on ${process.env.port}`);
});
