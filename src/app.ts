import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectDb, disconnectDB } from './config/database';


dotenv.config();
const app = express();

app.get('/health', (_req, res) => res.send('OK!'));

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;