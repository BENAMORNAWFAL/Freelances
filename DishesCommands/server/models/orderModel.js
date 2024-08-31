import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlConfig.js';
import User from './userModel.js'; 
import Menu from './menuModel.js'; 

const Order = sequelize.define('Order', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  //   onDelete: 'CASCADE',
  // },
  menuId: {
    type: DataTypes.INTEGER,
    references: {
      model: Menu,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

// User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Menu.hasMany(Order, { foreignKey: 'menuId', onDelete: 'CASCADE' });
// Order.belongsTo(Menu, { foreignKey: 'menuId', onDelete: 'CASCADE' });

export default Order;
