const express = require("express");
const routes = express.Router();

const UserController = require("../app/controllers/UserController")
const { store, update, storeValidator, updateValidator } = require("../app/middleware/UserValidator");

routes.get("/users", UserController.index);
routes.post("/user", store, storeValidator, UserController.store);
routes.put("/user/:id", update, updateValidator, UserController.update);
routes.delete("/user/:id", UserController.delete);

module.exports = routes;