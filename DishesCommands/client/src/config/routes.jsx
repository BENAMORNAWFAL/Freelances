import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from '../screens/Home';
import RegisterRestaurant from '../screens/RegisterRestaurant';
import Login from '../screens/Login';
import Restaurants from '../screens/Restaurants';
import RestaurantDetails from '../screens/RestaurantDetails';
import AddMenuItems from '../screens/AddMenuItems';
import OrderRequests from '../screens/OrderRequests';
import MyOrders from '../screens/MyOrders';
import MyFoods from '../screens/MyFoods';

const customHistory = createBrowserHistory();

// Routes For Navigation
const MyRoutes = () => (
    <Router history={customHistory}>
        {/* <Switch> */}
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route path='/register-restaurant' component={RegisterRestaurant} />
            <Route path='/login' component={Login} />
            <Route path='/restaurants' component={Restaurants} />
            <Route path='/restaurant-details' component={RestaurantDetails} />
            <Route path='/menu' component={AddMenuItems} />
            <Route path='/order-requests' component={OrderRequests} />
            <Route path='/my-orders' component={MyOrders} />
            <Route path='/update/food/:id' component={MyFoods} />
        {/* </Switch> */}
    </Router>
);

export default MyRoutes;
