import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Restaurants extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            menuItems: null,
            quantities: {}, // Store quantities for each menu item
            loading: true,
        };
    }

    async componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                defaultSearchValue: state,
            });
            this.handleSearchBar(state);
        }
        await this.fetchUser();
        await this.fetchMenuRestaurant();
    }

    async fetchUser() {
        try {
            const user_data = localStorage.getItem('user_data');
            if (!user_data) {
                throw new Error('No user connect found');
            }
            const userObject = JSON.parse(user_data);
            this.setState({ user: userObject, loading: false });
            console.log("User data storage:", userObject);
        } catch (error) {
            console.error('Error fetching user:', error);
            this.setState({ loading: false });
        }
    }

    async fetchMenuRestaurant() {
        try {
            const response = await axios.get(`http://localhost:3000/api/allmenus`);
            this.setState({ menuItems: response.data });
            console.log('Fetched all menu items successfully:', response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error.response ? error.response.data : error);
        }
    }

    handleQuantityChange(menuId, quantity) {
        this.setState(prevState => ({
            quantities: {
                ...prevState.quantities,
                [menuId]: quantity
            }
        }));
    }

    async handleOrderYourItemBtn(menuId) {
        if (!this.state.user) {
            console.error('User not found, please log in.');
            return;
        }

        const quantity = this.state.quantities[menuId] || 1; // Default quantity to 1 if not set
        const menuItem = this.state.menuItems.find(item => item.id === menuId);
        const totalPrice = menuItem.price * quantity;

        const order = {
            menuId: menuId,
            quantity: quantity,
            totalPrice: totalPrice,
            userId: this.state.user.id,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/neworder', order);
            console.log('Order placed successfully:', response.data);
        } catch (error) {
            console.error('Error placing order:', error.response ? error.response.data : error);
        }
    }

    render() {
        const { defaultSearchValue, menuItems } = this.state;
        return (
            <div>
                <div className="container-fluid restaurants-cont1">
                    <div className="">
                        <Navbar2 history={this.props.history} />
                        <div className="container px-0 restaurants-cont1-text">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroup-sizing-sm"><FontAwesomeIcon icon="search" /></span>
                                            </div>
                                            <input type="text" value={defaultSearchValue} onChange={(e) => this.handleSearchBar(e.target.value)} className="form-control" placeholder="RESTAURANT NAME" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ background: '#EBEDF3' }} className="container-fluid py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-12">
                                <div className="listing-filter">
                                    <div className="filter-heading py-2 mb-3">
                                        <h6 className="m-0"><FontAwesomeIcon icon="utensils" className="mr-2" />Categories</h6>
                                    </div>
                                    <div>
                                        <ul className="filter-list">
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="apple-juice" name="Apple Juice" />
                                                    <label className="custom-control-label" htmlFor="apple-juice">Juices</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="bbq" name="BB.Q" />
                                                    <label className="custom-control-label" htmlFor="bbq">Candies</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="beef-roast" name="Beef Roast" />
                                                    <label className="custom-control-label" htmlFor="beef-roast">Food</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col w-100">
                                <h4 className="mb-3">Restaurant's Found</h4>
                                <div>
                                    {menuItems ? menuItems.map(menu => (
                                        <div className="w-100 p-4 bg-light" key={menu.id}>
                                            <div className="col-sm mx-auto bg-white shadow p-4">
                                                <div className='d-flex'>
                                                    <div>
                                                        <img style={{ width: '200px', marginRight: '20px' }} src="src/assets/images/MenuLogo.jpg" alt="items" />
                                                    </div>
                                                    <div>
                                                        <h3>{menu.name}</h3>
                                                        <p>Description: {menu.description}</p>
                                                        <p>Price: {menu.price} TND</p>
                                                        <p>Menu Type: {menu.menuType}</p>
                                                        <div className="mb-3">
                                                            <label htmlFor={`quantity-${menu.id}`} className="form-label">Quantity:</label>
                                                            <input 
                                                                type="number" 
                                                                id={`quantity-${menu.id}`} 
                                                                className="form-control" 
                                                                min="1" 
                                                                value={this.state.quantities[menu.id] || 1} 
                                                                onChange={(e) => this.handleQuantityChange(menu.id, parseInt(e.target.value))}
                                                            />
                                                        </div>
                                                        <button type="button" className="btn btn-warning text-uppercase mb-3" onClick={() => this.handleOrderYourItemBtn(menu.id)}><b>order</b></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : NaN}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        restaurantList: state.restaurantList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // restaurant_list: () => dispatch(restaurant_list()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
