import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { useParams, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

const MyFoods = (props) => {
    const { id } = useParams(); // Get ID from params
    const [itemImageLabel, setItemImageLabel] = useState("Choose image");
    const [itemTitle, setItemTitle] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemImage, setItemImage] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [chooseItemType, setChooseItemType] = useState("");
    const [showError, setShowError] = useState(false);
    const [registerFormError, setRegisterFormError] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);
    useEffect(() => {
        // Fetch menu item details when component mounts
        fetchMenuItem();
    }, []);

    const fetchMenuItem = async () => {
        try {
            console.log("**************************** id :", id);
            const response = await axios.get(`http://localhost:3000/api/menu/${id}`);
            const menuItem = response.data;
            setItemTitle(menuItem.name);
            setItemPrice(menuItem.price);
            setItemImageLabel(menuItem.itemImage);
            setItemDescription(menuItem.description);
            setChooseItemType(menuItem.menuType);
        } catch (error) {
            console.error('Error fetching menu item:', error.response ? error.response.data : error);
        }
    }

    const handleUpdateItemBtn = async () => {
        if (!itemTitle || !itemDescription || !itemPrice || !chooseItemType) {
            setShowError(true);
            setRegisterFormError("All fields are required.");
        } else {
            setShowError(false);
            setRegisterFormError("");

            const updatedItem = {
                name: itemTitle,
                description: itemDescription,
                price: itemPrice,
                menuType: chooseItemType
            };

            try {
                console.log('update item in successfully:***********************', updatedItem);
                const response = await axios.put(`http://localhost:3000/api/updatemenu/${id}`, updatedItem);
                console.log('update item in successfully:', response.data);
                setShouldRedirect(true);
                // this.props.history.push("/menu");

            } catch (error) {
                console.error('Error updating item:', error.response ? error.response.data.message : error);
            }
        }
    }

    if (shouldRedirect) {
        return <Redirect to="/menu" />;
    }

    const handleItemImage = (e) => {
        if (e.target.files[0] != null) {
            setItemImageLabel(e.target.files[0].name);
            setItemImage(e.target.files[0]);
        } else {
            setItemImageLabel("Choose image");
            setItemImage("");
        }
    }

    return (
        <div>
            <div className="container-fluid res-details-cont1">
                <Navbar2 history={props.history} />
                <div className="container px-0 res-details-cont1-text mx-0 ">
                    {/* Additional content here if needed */}
                </div>
            </div>
            <div style={{ background: "#EBEDF3" }} className="container-fluid py-5">
                <div className="container">

                    <div className="col-lg-6 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">
                        <h2 className="text-center mb-4">Edit Menu Item</h2>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemTitle"><b>Item Title</b></label>
                                    <input type="text" className="form-control" id="itemTitle" placeholder="Full name of dish" value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemPrice"><b>Price</b></label>
                                    <input type="number" className="form-control" id="itemPrice" placeholder="Price in number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="mb-2"><b>Item Image</b></label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="itemImage" onChange={handleItemImage} />
                                        <label className="custom-file-label" htmlFor="itemImage">{itemImageLabel}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemDescription"><b>Description</b></label>
                                    <textarea className="form-control" id="itemDescription" placeholder="Item description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                                </div>
                            </div>
                            <label className="mb-2"><b>Choose Item Type</b></label>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="food" value="food" name="chooseItemType" checked={chooseItemType === 'food'} onChange={(e) => setChooseItemType(e.target.value)} />
                                        <label className="custom-control-label" htmlFor="food">Food</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="candies" value="candies" name="chooseItemType" checked={chooseItemType === 'candies'} onChange={(e) => setChooseItemType(e.target.value)} />
                                        <label className="custom-control-label" htmlFor="candies">Candies</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="juices" value="juices" name="chooseItemType" checked={chooseItemType === 'juices'} onChange={(e) => setChooseItemType(e.target.value)} />
                                        <label className="custom-control-label" htmlFor="juices">Juices</label>
                                    </div>
                                </div>
                            </div>

                            {showError && <p className="text-danger">{registerFormError}</p>}
                            <button type="button" className="btn btn-warning text-uppercase mb-3" onClick={handleUpdateItemBtn}><b>Update Item</b></button>
                        </form>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
    myFoods: state.myFoods
});

export default connect(mapStateToProps)(MyFoods);
