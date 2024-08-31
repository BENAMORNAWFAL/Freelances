import Restaurant from '../models/restaurantModel.js';

//  get all Restaurants
export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new Restaurant
export const createRestaurant = async (req, res, next) => {
  try {
    const { restoName, restoEmail, restoPassword, restoCity, restoAdresse, restoCategory, restoPhone } = req.body;
    const newresto = await Restaurant.create({  name: restoName, email: restoEmail, password: restoPassword, city: restoCity, adresse: restoAdresse, category: restoCategory, phone: restoPhone });
    res.status(201).json(newresto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a one restaurant by ID
export const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id, 
    //   {
    //   include: Menu, 
      
    // }
  );

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, adresse, city, phone, category } = req.body;

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.name = name || restaurant.name;
    restaurant.email = email || restaurant.email;
    restaurant.password = password || restaurant.password;
    restaurant.adresse = adresse || restaurant.adresse;
    restaurant.city = city || restaurant.city;
    restaurant.phone = phone || restaurant.phone;
    restaurant.category = category || restaurant.category;

    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.destroy();
    res.status(200).json({ message: 'Restaurant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};