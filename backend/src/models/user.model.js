import { Sequelize } from "sequelize";
import { sequelize } from "../lib/db.js";


const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default User;