import cluster from 'cluster';
import os from 'node:os';
import 'dotenv/config';
import { upServer } from '../index';

const ports = [
  process.env.PORT_ONE,
  process.env.PORT_TWO,
  process.env.PORT_THREE,
];
const osCount = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Prime in ${process.pid}`);

  ports.forEach((ports) => {
    for (let i = 0; i < osCount; i++) {
      const worker = cluster.fork({ PORT: ports });
      console.log(
        `Work in ${worker.process.pid} process, start in port ${ports}`,
      );
    }
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} out`);
  });
} else {
  const port = process.env.PORT;
  if (port) upServer(port);
}
