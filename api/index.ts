import serverless from 'serverless-http';
import app from '../src/app';
import config from '../src/app/config';
import {connectDB} from '../src/app/config/db';


connectDB(config.database_url as string)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

export const handler = serverless(app);