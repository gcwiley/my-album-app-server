import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  // model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the User model
export { User };
