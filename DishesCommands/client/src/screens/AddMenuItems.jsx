import React, { Component } from 'react';
import Navbar2 from '../components/Navbar2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

export default class AddMenuItems extends Component {
    constructor() {
        super();
        this.state = {
            itemImageLabel: "Choose image",
            itemTitle: "",
            itemPrice: 0,
            itemImage: "",
            itemDescription: "",
            chooseItemType: "",
            showError: false,
            registerFormError: "",
            user: null,
            loading: true,
            menuItems: null
        };
        this.handleItemImage = this.handleItemImage.bind(this);
        this.handleAddYourItemBtn = this.handleAddYourItemBtn.bind(this);
    }

    handleItemImage(e) {
        if (e.target.files[0] != null) {
            this.setState({
                itemImageLabel: e.target.files[0].name,
                itemImage: e.target.files[0].name
            });
        } else {
            this.setState({
                itemImageLabel: "Choose image",
                itemImage: "",
            });
        }
    }


    componentDidMount() {
        this.fetchUser();
    }

    async fetchUser() {
        try {
            const user_data = localStorage.getItem('user_data');
            if (!user_data) {
                throw new Error('No user connect found');
            }
            const userObject = JSON.parse(user_data);
            this.setState({ user: userObject, loading: false }, () => {
                this.fetchMenuRestaurant();
            });
            console.log(" user data storage ****** :", userObject);


        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            this.setState({ loading: false });
        }
    }

    async fetchMenuRestaurant() {


        try {
            const response = await axios.get(`http://localhost:3000/api/menusresto/${this.state.user.id}`);
            this.setState({ menuItems: response.data });
            console.log('fetch all menu in successfully:', response.data);

        } catch (error) {
            console.error('Error in Login:', error.response ? error.response.data : error);
        }
    }


    async handleAddYourItemBtn() {
        const { itemTitle, itemDescription, itemPrice, itemImage, chooseItemType, restaurantID = this.state.user.id } = this.state;
        console.log("===========================", { itemTitle, itemDescription, itemPrice, itemImage, chooseItemType, restaurantID });
        if (!itemTitle || !itemDescription || !itemPrice || !itemImage || !chooseItemType || !restaurantID) {
            this.setState({
                showError: true,
                registerFormError: "All fields are required."
            });
        } else {
            this.setState({
                showError: false,
                registerFormError: ""
            });

            const itemDetails = {
                name: itemTitle,
                description: itemDescription,
                price: itemPrice,
                restaurantId: restaurantID,
                menuType: chooseItemType,

            };

            try {

                console.log('ItemMenu ************', itemDetails);
                const response = await axios.post('http://localhost:3000/api/newmenu', itemDetails);
                console.log('add item in successfully:', response.data);
                this.fetchMenuRestaurant();
            } catch (error) {
                console.error('Error in Login:', error.response ? error.response.data : error);
            }
        }
    }

    handleDeleteYourItemBtn = (id) => {
        this.props.history.push("/update/food");

    }

    handleDeleteYourItemBtn = (id) => {
        console.log('id delete =============', id);

        axios.delete(`http://localhost:3000/api/deletemenu/${id}`)
            .then(response => {
                console.log('delete item successfully:', response.data);
                this.fetchMenuRestaurant();
            })
            .catch(error => {
                console.error('Error in delete item:', error);

            });

    }

    render() {
        const { itemImageLabel, showError, registerFormError, menuItems, user } = this.state;
        return (
            <div>
                <div className="container-fluid register-cont1">
                    <Navbar2 history={this.props.history} userType='restaurant'/>
                    <div className="container register-cont1-text">
                        <h1 className="text-uppercase text-white text-center mb-4"><strong>Hello {user ? user.name : NaN}</strong></h1>
                        <h1 className="text-uppercase text-white text-center mb-4"><strong>Here Your Best Food Items</strong></h1>
                    </div>
                </div>
                <div className="container-fluid py-5 bg-light">
                    <div className="col-lg-6 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">
                        <h2 className="text-center mb-4">Add Menu Items</h2>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemTitle"><b>Item Title</b></label>
                                    <input type="text" className="form-control" id="itemTitle" placeholder="Full name of dish" onChange={(e) => this.setState({ itemTitle: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemPrice"><b>Price</b></label>
                                    <input type="number" className="form-control" id="itemPrice" placeholder="Price in number" onChange={(e) => this.setState({ itemPrice: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="mb-2"><b>Item Image</b></label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="itemImage" onChange={this.handleItemImage} />
                                        <label className="custom-file-label" htmlFor="itemImage">{itemImageLabel}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemDescription"><b>Description</b></label>
                                    <textarea type="number" className="form-control" id="itemDescription" placeholder="Item description" onChange={(e) => this.setState({ itemDescription: e.target.value })} />
                                </div>
                            </div>
                            <label className="mb-2"><b>Choose Item Type</b></label>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="food" value="food" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="food">Food</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="candies" value="candies" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="candies">Candies</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="juices" value="juices" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="juices">Juices</label>
                                    </div>
                                </div>

                            </div>

                            {showError && <p className="text-danger">{registerFormError}</p>}
                            <button type="button" className="btn btn-warning text-uppercase mb-3" onClick={this.handleAddYourItemBtn}><b>Add your item</b></button>
                        </form>
                    </div>
                </div>
                {menuItems ? menuItems.map(menu => (
                    <div className="container-fluid py-2 bg-light" key={menu.id}>
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">
                            <div className='d-flex'>
                                <div>
                                    <img style={{ width: '200px', marginRight: '20px' }} src="src/assets/images/MenuLogo.jpg" alt="items" />
                                </div>
                                <div>
                                    <h3>{menu.name}</h3>
                                    <p>Description: {menu.description}</p>
                                    <p>Price: {menu.price} TND</p>
                                    <p>Menu Type: {menu.menuType}</p>
                                    {/* <div className='row'> */}
                                    <Link to={`/update/food/${menu.id}`} className="btn btn-warning text-uppercase mb-3 mx-2"><b>Update item</b></Link>
                                    <button type="button" className="btn btn-danger text-uppercase mb-3" onClick={() => this.handleDeleteYourItemBtn(menu.id)}><b>Delete item</b></button>
                                    {/* </div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                )) : NaN}
                <Footer />
            </div>
        );
    }
}
