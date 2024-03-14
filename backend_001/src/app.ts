import express from 'express';
export const app = express();

import "./database";
import { routes } from './routes';

app.use([
    express.json(),
    routes
]);