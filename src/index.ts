import 'dotenv/config';
import http from 'http';
import 'dotenv/config';

import { servicesController } from './services/index';

const upServer = (ports: string) => {
  const server = http.createServer(async (request, response) => {
    try {
      console.log(
        `Massage from API server, pid: ${process.pid} on port: ${ports}`,
      );

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

  server.listen(ports, () => {
    console.log(`server start on ${process.env.port}`);
  });
};

export { upServer };
