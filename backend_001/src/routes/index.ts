import { Router } from 'express';
export const routes = Router();

import UserController from '../app/controllers/UserController';
import { store } from '../app/middleware/user/storeRequest';
import { update } from '../app/middleware/user/updateRequest';

routes.get("/users", new UserController().index);
routes.post("/user", store, new UserController().store);
routes.put("/user/:id", update, new UserController().update);
routes.delete("/user/:id", new UserController().delete);