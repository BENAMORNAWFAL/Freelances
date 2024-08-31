import Order from '../models/orderModel.js';
import Menu from '../models/menuModel.js';
import User from '../models/userModel.js';

// Create a new order
export const createOrder = async (req, res) => {
  const { userId, menuId, quantity } = req.body;

  try {
    const user = await User.findByPk(userId);
    const menu = await Menu.findByPk(menuId);

    if (!user || !menu) {
      return res.status(404).json({ message: 'User or Menu item not found' });
    }

    const totalPrice = menu.price * quantity;

    const newOrder = await Order.create({
      userId,
      menuId,
      quantity,
      totalPrice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for a user
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: Order,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.Orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a one order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      include: [User, Menu],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const menu = await Menu.findByPk(order.menuId);
    const totalPrice = menu.price * quantity;

    order.quantity = quantity;
    order.totalPrice = totalPrice;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
