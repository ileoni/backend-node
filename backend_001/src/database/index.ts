import { Sequelize, Options } from 'sequelize';
import { development } from "../config/database";

const sequelize = new Sequelize((development as Options));
sequelize.authenticate()
    .then(() => console.log("A conexão foi um sucesso."))
    .catch(err => console.error("Não foi possível conectar ao banco.", err));

import User from '../app/models/User';
User._init(sequelize);