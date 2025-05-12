import 'dotenv/config';
import { upServer } from './index';
const devPort = process.env.DEV_PORT || 4001;

upServer(devPort);
