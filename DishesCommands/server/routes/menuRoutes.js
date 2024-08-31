import express from 'express';
import {
  createMenuItem,
  getMenuItemsByRestaurant,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems
} from '../controllers/menuController.js';

const MenuRoutes = express.Router();

// Routes for menu items
MenuRoutes.post('/api/newmenu', createMenuItem);
MenuRoutes.get('/api/menusresto/:restaurant_id', getMenuItemsByRestaurant);
MenuRoutes.get('/api/menu/:id', getMenuItemById);
MenuRoutes.get('/api/allmenus', getMenuItems);
MenuRoutes.put('/api/updatemenu/:id', updateMenuItem);
MenuRoutes.delete('/api/deletemenu/:id', deleteMenuItem);

export default MenuRoutes;
