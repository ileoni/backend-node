const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model
{
  static init(sequelize)
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
        set(password)
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

module.exports = User;