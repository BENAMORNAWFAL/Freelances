import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlConfig.js';
import Restaurant from './restaurantModel.js'; // Adjust the import based on your file structure
import Order from './orderModel.js';

const Menu = sequelize.define('Menu', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  menuType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Restaurant,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

// Restaurant.hasMany(Menu, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
// Menu.belongsTo(Restaurant, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });

// Menu.hasMany(Order, { foreignKey: 'menuId', onDelete: 'CASCADE' });
// Order.belongsTo(Menu, { foreignKey: 'menuId', onDelete: 'CASCADE' });

export default Menu;
