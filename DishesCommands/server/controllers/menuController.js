import Menu from '../models/menuModel.js';
import Restaurant from '../models/restaurantModel.js';

// Create a new menu item
export const createMenuItem = async (req, res) => {
  const { name, description, price, restaurantId , menuType } = req.body;

  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menuItem = await Menu.create({ name, description, price, restaurantId , menuType });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items for a restaurant
export const getMenuItemsByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  

  try {
    const menuItems = await Menu.findAll();
    
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'Menu items not found for this restaurant' });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getMenuItems = async (req, res) => {
  

  try {
    const menuItems = await Menu.findAll();
    
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'Menu items not found for this restaurant' });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single menu item
export const getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price , menuType, restaurantId } = req.body;

  try {
    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.restaurantId = restaurantId || menuItem.restaurantId;
    menuItem.menuType = menuType || menuType.price;

    await menuItem.save();
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  console.log("id to deleting ===================",id);
  try {
    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await menuItem.destroy();
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
