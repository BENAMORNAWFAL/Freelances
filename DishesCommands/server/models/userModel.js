import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlConfig.js';
import Order from './orderModel.js';





const User = sequelize.define('User', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  country:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  age:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  
});

// association with order OneToMeny
// User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });



export default User;
