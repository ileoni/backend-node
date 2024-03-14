import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

export type UserAttributes = {
  id: number;
  name: string;
  lastname: string;
  date: Date | null;
  email: string;
  password: string;
  confirmPassword: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

class User extends Model<UserAttributes, UserCreationAttributes>
{
  declare id: number;
  declare name: string;
  declare lastname: string;
  declare date: Date | null;
  declare email: string;
  declare password: string;
  declare confirmPassword: string;

    static _init(sequelize: Sequelize)
    {
        super.init({
            name: DataTypes.STRING,
            lastname: {
              type: DataTypes.STRING,
              set(lastname)
              {
                if(lastname !== "") {
                  const name = this.getDataValue("name");
                  this.setDataValue('name', `${name} ${lastname}`)
                }
              }
            },
            date: {
              type: DataTypes.DATE,
              allowNull: true
            },
            email: DataTypes.STRING,
            password: {
              type: DataTypes.STRING,
              set(password: string)
              {
                const password_hash = bcrypt.hashSync(password, 8);
                this.setDataValue('password', password_hash);
              }
            }
          }, {
            sequelize,
            defaultScope: {
              attributes: {
                exclude: ["password", "lastname", "createdAt", "updatedAt"]
              }
            }
          })
    }
}

export default User;