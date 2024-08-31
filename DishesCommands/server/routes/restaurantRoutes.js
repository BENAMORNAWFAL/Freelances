import express from 'express';
import {
    createRestaurant, getRestaurants, getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
} from '../controllers/restaurantController.js';

const RestaurantRoutes = express.Router();


RestaurantRoutes.get('/api/restaurants', getRestaurants);
RestaurantRoutes.post('/api/newrestaurant', createRestaurant);
RestaurantRoutes.get('/api/restaurant/:id', getRestaurantById);
RestaurantRoutes.put('/api/updaterestaurant/:id', updateRestaurant);
RestaurantRoutes.delete('/api/deleterestaurant/:id', deleteRestaurant);
export default RestaurantRoutes;
