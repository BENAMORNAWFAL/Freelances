import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';

const orderRoutes = express.Router();

// Routes for orders
orderRoutes.post('/api/neworder', createOrder);
orderRoutes.get('/api/user/order/:userId', getOrdersByUser);
orderRoutes.get('/api/order/:id', getOrderById);
orderRoutes.put('/api/update/order/:id', updateOrder);
orderRoutes.delete('/api/delete/order/:id', deleteOrder);

export default orderRoutes;
