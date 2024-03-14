const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const { development } = require("../config/database");

const sequelize = new Sequelize(development);
sequelize.authenticate()
    .then(() => console.log("Conexão com banco foi um sucesso."))
    .catch(err => console.error("Não foi possível conectar ao banco.", err));

const _models = path.resolve("src", "app", "models");
fs.readdirSync(_models).map(model => require(`${_models}\\${model}`).init(sequelize));