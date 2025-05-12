import { fork } from 'child_process';
import path from 'node:path';

const paths = path.resolve(__dirname, 'cluster');
console.log(paths);

fork(path.resolve(__dirname, 'cluster'));
fork(path.resolve(__dirname, 'balancer'));
