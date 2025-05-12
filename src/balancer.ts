import http, { IncomingMessage, ServerResponse } from 'node:http';
import 'dotenv/config';

interface RQList {
  host: string;
  port: number;
}

let indexServer = 0;

const reqList = [
  { host: 'localhost', port: 4001 },
  { host: 'localhost', port: 4002 },
  { host: 'localhost', port: 4003 },
];

const server = http.createServer(async (req, res) => {
  const nextServer = reqList[indexServer];
  await roundRequest(req, res, nextServer);
  indexServer = (indexServer + 1) % reqList.length;
});

const roundRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  list: RQList,
) => {
  const options = {
    host: list.host,
    port: list.port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const reqOnServer = http.request(options, (resFromSer) => {
    res.writeHead(resFromSer.statusCode ?? 500, resFromSer.headers);
    resFromSer.pipe(res);
  });

  req.pipe(reqOnServer);

  reqOnServer.on('error', () => {
    res.writeHead(500);
    res.end(`Server ${list.host}:${list.port} is dead`);
  });
};

server.listen(process.env.BALANCER_PORT, () => {
  console.log(`Server balancer start on ${process.env.BALANCER_PORT}`);
});

const serverBal = () => {
  server.listen(process.env.BALANCER_PORT, () => {
    console.log(`Server balancer start on ${process.env.BALANCER_PORT}`);
  });
};

export { serverBal };
