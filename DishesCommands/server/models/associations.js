import User from './userModel.js';
import Menu from './menuModel.js';
import Order from './orderModel.js';
import Restaurant from './restaurantModel.js';

// associations
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

Menu.hasMany(Order, { foreignKey: 'menuId', onDelete: 'CASCADE' });
Order.belongsTo(Menu, { foreignKey: 'menuId', onDelete: 'CASCADE' });

Restaurant.hasMany(Menu, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });

export default {
  User,
  Menu,
  Order,
  Restaurant,
};
