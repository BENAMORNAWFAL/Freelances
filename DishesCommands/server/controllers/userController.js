import Restaurant from '../models/restaurantModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

//  get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new user
export const createUser = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword, userCity, userCountry, userGender, userAge } = req.body;
    const newUser = await User.create({  fullname: userName, email: userEmail, password: userPassword, city: userCity, country: userCountry, gender: userGender, age: userAge });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, city, country, gender, age } = req.body;
  console.log("*******",fullname, email, password, city, country, gender, age )
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password if it is provided
    // const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
      
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.password = user.password;
    user.city = city || user.city;
    user.country = country || user.country;
    user.gender = gender || user.gender;
    user.age = age || user.age;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("login server *****:",{ email, password });
  
  try {

    const userone = await User.findOne({ where: { email } });
    let user=userone
    let type = 'normalUser'
    if (!userone) {
      const usertwo = await Restaurant.findOne({ where: { email } });
      if (!usertwo) {
        return res.status(404).json({ message: 'User not found' });
      }else{
        type='restaurant'
        user= usertwo
      }
      
    }else{

    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid password' });
    // }
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, type , user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  
};