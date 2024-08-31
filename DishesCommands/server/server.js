// server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/mysqlConfig.js';
import userRoutes from './routes/userRoutes.js';
import RestaurantRoutes from './routes/restaurantRoutes.js';
import MenuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import './models/userModel.js';
import './models/menuModel.js';
import './models/orderModel.js';
import './models/restaurantModel.js';
import './models/associations.js'; // Ensure associations are set up


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for CORS
app.use(cors());


// Routes
app.use(userRoutes);
app.use(RestaurantRoutes);
app.use(MenuRoutes);
app.use(orderRoutes);




// Error handling middleware with correct parameters
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Verify database connection and synchronize models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchronize all defined models to the DB
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
