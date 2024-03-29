import { DataTypes } from 'sequelize';

// import the sequelized instance
import { sequelize } from '../db/db.js';

// create the User model
const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

// Export the User model
export { User };
