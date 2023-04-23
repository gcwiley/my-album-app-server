import { DataTypes } from 'sequelize';

// import the sequelized instance
import { sequelize } from '../db/db.js';

// create the User model
const Comment = sequelize.define('Comment', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the User model
export { Comment };
